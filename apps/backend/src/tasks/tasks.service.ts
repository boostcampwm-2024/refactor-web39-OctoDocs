import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  RedisEdge,
  RedisPage,
  RedisNode,
  RedisService,
} from '../redis/redis.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Page } from '../page/page.entity';
import { Node } from '../node/node.entity';
import { Edge } from '../edge/edge.entity';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';

const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.log('스케줄러 시작');
    // 시작 시간
    const startTime = performance.now();

    const pageKeys = await this.redisClient.keys('page:*');
    const nodeKeys = await this.redisClient.keys('node:*');
    const edgeKeys = await this.redisClient.keys('edge:*');

    Promise.allSettled([
      ...pageKeys.map(this.migratePage.bind(this)),
      ...nodeKeys.map(this.migrateNode.bind(this)),
      ...edgeKeys.map(this.migrateEdge.bind(this)),
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

    const updateData: Partial<Page> = {};

    if (title) updateData.title = title;
    if (content) updateData.content = JSON.parse(content);
    if (emoji) updateData.emoji = emoji;

    // 업데이트 대상이 없다면 리턴
    if (Object.keys(updateData).length === 0) return;
    const pageId = parseInt(key.split(':')[1]);

    // 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    const redisRunner = this.redisClient.multi();
    try {
      await queryRunner.startTransaction();

      // 갱신 시작
      const pageRepository = queryRunner.manager.getRepository(Page);

      // TODO : 페이지가 없으면 affect : 0을 반환하는데 이 부분 처리도 하는 게 좋을 듯...?
      await pageRepository.update(pageId, updateData);

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

  async migrateEdge(key: string) {
    // 낙관적 락 적용
    await this.redisClient.watch(key);
    const data = await this.redisClient.hgetall(key);
    const redisData = Object.fromEntries(
      Object.entries(data).map(([field, value]) => [field, value]),
    ) as RedisEdge;

    // 데이터 없으면 오류
    if (!redisData) {
      throw new Error(`redis에 ${key}에 해당하는 데이터가 없습니다.`);
    }

    // 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    const redisRunner = this.redisClient.multi();

    try {
      await queryRunner.startTransaction();

      // 갱신 시작
      const edgeRepository = queryRunner.manager.getRepository(Edge);
      const nodeRepository = queryRunner.manager.getRepository(Node);

      const fromNode = await nodeRepository.findOne({
        where: { id: redisData.fromNode },
        relations: ['workspace'],
      });

      const toNode = await nodeRepository.findOne({
        where: { id: redisData.toNode },
      });

      if (redisData.type === 'add') {
        await edgeRepository.save({
          fromNode,
          toNode,
          workspace: fromNode.workspace,
        });
      }

      // if (redisData.type === 'delete') {
      //   const edge = await edgeRepository.findOne({
      //     where: { fromNode, toNode },
      //   });
      //   console.log(`edge 정보 `);
      //   console.log(edge);
      //   console.log(`edge content : ${edge}`);

      //   await edgeRepository.delete({ id: edge.id });
      // }

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
}
