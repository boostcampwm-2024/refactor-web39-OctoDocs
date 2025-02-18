import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisPage, RedisNode } from '@app/redis/redis.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Node } from '@app/node/node.entity';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';

const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';
// Embeddings 초기화
const embeddings = new HuggingFaceTransformersEmbeddings({
  model: 'Xenova/all-MiniLM-L6-v2',
});

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.log('스케줄러 시작');
    // 시작 시간
    const startTime = performance.now();

    const pageKeys = await this.redisClient.keys('page:*');
    const nodeKeys = await this.redisClient.keys('node:*');
    // const edgeKeys = await this.redisClient.keys('edge:*');

    Promise.allSettled([
      ...pageKeys.map(this.migratePage.bind(this)),
      ...nodeKeys.map(this.migrateNode.bind(this)),
      // ...edgeKeys.map(this.migrateEdge.bind(this)),
    ])
      .then((results) => {
        const endTime = performance.now();
        this.logger.log(`총 개수 : ${results.length}개`);
        this.logger.log(
          `성공 개수 : ${results.filter((result) => result.status === 'fulfilled').length}개`,
        );
        this.logger.log(
          `실패 개수 : ${results.filter((result) => result.status === 'rejected').length}개`,
        );
        this.logger.log(`실행 시간 : ${(endTime - startTime) / 1000}초`);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  async migratePage(key: string) {
    // 낙관적 락 적용
    await this.redisClient.watch(key);

    const data = await this.redisClient.hgetall(key);
    const redisData = Object.fromEntries(
      Object.entries(data).map(([field, value]) => [field, value]),
    ) as RedisPage;
    // 데이터 없으면 오류
    if (!redisData) {
      throw new Error(`redis에 ${key}에 해당하는 데이터가 없습니다.`);
    }

    const { title, content, emoji } = redisData;

    // 업데이트 대상이 없다면 리턴
    if (!title && !content && !emoji) return;
    const pageId = parseInt(key.split(':')[1]);

    // 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    const redisRunner = this.redisClient.multi();
    try {
      await queryRunner.startTransaction();

      // 갱신 시작
      // prepared statement 준비
      const updateFields: string[] = [];
      const params = [];
      let sequence = 1;

      if (title) {
        updateFields.push(`title = $${sequence++}`);
        params.push(title);
      }
      if (content) {
        updateFields.push(`content = $${sequence++}`);
        updateFields.push(`document = $${sequence++}`);
        updateFields.push(`embedding = $${sequence++}`);

        // document는 JSON 타입에서 의미있는 문자열만 뽑아서 합친 문자열
        const document = this.extractTextValues(JSON.parse(content));

        // content가 있으면 임베딩 진행
        const vector = await embeddings.embedDocuments([document]);
        params.push(content);
        params.push(document);
        params.push(`[${vector[0].join(',')}]`);
      }
      if (emoji) {
        updateFields.push(`emoji = $${sequence++}`);
        params.push(emoji);
      }
      params.push(`${pageId}`);

      if (updateFields.length > 0) {
        const query = `UPDATE page SET ${updateFields.join(', ')} WHERE id = $${sequence}`;
        console.log('Query');
        console.log(query);
        await queryRunner.query(query, params);
      }

      // redis에서 데이터 삭제
      redisRunner.del(key);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      await redisRunner.exec();
    } catch (err) {
      // 실패하면 postgres는 roll back하고 redis의 값을 살린다.
      this.logger.error(err.stack);
      await queryRunner.rollbackTransaction();
      redisRunner.discard();

      // Promise.all에서 실패를 인식하기 위해 에러를 던진다.
      throw err;
    } finally {
      // 리소스 정리
      await queryRunner.release();
    }
  }

  async migrateNode(key: string) {
    // 낙관적 락 적용
    await this.redisClient.watch(key);

    const data = await this.redisClient.hgetall(key);
    const redisData = Object.fromEntries(
      Object.entries(data).map(([field, value]) => [field, value]),
    ) as RedisNode;
    // 데이터 없으면 오류
    if (!redisData) {
      throw new Error(`redis에 ${key}에 해당하는 데이터가 없습니다.`);
    }

    const { x, y, color } = redisData;
    const updateData: Partial<Node> = {};

    if (x) updateData.x = Number(x);
    if (y) updateData.y = Number(y);
    if (color) updateData.color = color;

    // 쿼리 대상이 없다면 리턴
    if (Object.keys(updateData).length === 0) return;
    const nodeId = parseInt(key.split(':')[1]);

    // 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    const redisRunner = this.redisClient.multi();
    try {
      await queryRunner.startTransaction();

      // 갱신 시작
      const nodeRepository = queryRunner.manager.getRepository(Node);

      // TODO : 페이지가 없으면 affect : 0을 반환하는데 이 부분 처리도 하는 게 좋을 듯...?
      await nodeRepository.update(nodeId, updateData);

      // redis에서 데이터 삭제
      redisRunner.del(key);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      await redisRunner.exec();
    } catch (err) {
      // 실패하면 postgres는 roll back하고 redis의 값을 살린다.
      this.logger.error(err.stack);
      await queryRunner.rollbackTransaction();
      redisRunner.discard();

      // Promise.all에서 실패를 인식하기 위해 에러를 던진다.
      throw err;
    } finally {
      // 리소스 정리
      await queryRunner.release();
    }
  }
  /**
   *
   * @param pageContent 페이지 변경 사항 JSON
   * @returns JSON 중 text key만 추출해서 합친 문자열
   */
  extractTextValues(pageContent: object) {
    const result: string[] = [];
    const stack: any[] = [pageContent]; // 스택을 사용하여 JSON 탐색

    while (stack.length > 0) {
      const current = stack.pop();

      if (typeof current === 'object' && current !== null) {
        if (Array.isArray(current)) {
          // 배열이면 모든 요소를 스택에 추가
          stack.push(...current);
        } else {
          // 객체면 다시 탐색
          for (const [key, value] of Object.entries(current)) {
            if (key === 'text') {
              result.push(String(value));
            } else {
              stack.push(value);
            }
          }
        }
      }
    }

    return result.reverse().join('\n');
  }
}
