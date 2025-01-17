import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

export type RedisPage = {
  title?: string;
  content?: string;
  emoji?: string;
};

export type RedisNode = {
  x?: number;
  y?: number;
  color?: string;
};

export type RedisEdge = {
  fromNode?: number;
  toNode?: number;
  type?: 'add' | 'delete';
};

const releaseScript = `
  if redis.call("get",KEYS[1]) == ARGV[1] then
      return redis.call("del",KEYS[1])
  else
      return 0
  end
  `;
@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis,
  ) {}
  async acquireLock(
    redisClient: Redis,
    key: string,
    retryCount = 10,
    retryDelay = 100,
  ) {
    key = 'lock:' + key;
    // retryCount만큼 시도
    for (let i = 0; i < retryCount; i++) {
      const value = Date.now().toString();
      Logger.log(`redis lock info ${key} : ${value}`);
      const acquireResult = await redisClient.set(key, value, 'EX', 10, 'NX');
      Logger.log(acquireResult);

      // 락 획득 성공
      if (acquireResult == 'OK') {
        Logger.log(`시도 횟수 : ${i}`);
        const release = async () => {
          Logger.log(`release 하려는 key : ${key}`);
          Logger.log(`release 하려는 value : ${value}`);
          const releaseResult = await redisClient.eval(
            releaseScript,
            1,
            key,
            value,
          );
          // 락 해제 성공
          Logger.log(`락 해제 결과 : ${releaseResult}`);
          if (releaseResult === 1) {
            Logger.log('락 해제 성공');
            return true;
          }
          // 락 해제 실패
          Logger.log('락 해제 실패');
          return false;
        };
        return release;
      }

      // 락 획득 실패하면 retryDelay이후 다시 획득 시도
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, retryDelay);
      });
    }
    throw new Error('락 획득 실패');
  }

  async getAllKeys(pattern) {
    return await this.redisClient.keys(pattern);
  }

  createStream() {
    return this.redisClient.scanStream();
  }

  async get(key: string) {
    const data = await this.redisClient.hgetall(key);
    return Object.fromEntries(
      Object.entries(data).map(([field, value]) => [field, value]),
    );
  }

  async set(key: string, value: object) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(this.redisClient, key);
    await this.redisClient.hset(key, Object.entries(value));

    // 락 해제
    await release();
  }
  async setFields(key: string, map: Record<string, string>) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(this.redisClient, key);
    // fieldValueArr 배열을 평탄화하여 [field, value, field, value, ...] 형태로 변환
    const flattenedFields = Object.entries(map).flatMap(([field, value]) => [
      field,
      value,
    ]);
    // 락 해제
    await release();
    // hset을 통해 한 번에 여러 필드를 설정
    return await this.redisClient.hset(key, ...flattenedFields);
  }
  async setField(key: string, field: string, value: string) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(this.redisClient, key);
    const result = await this.redisClient.hset(key, field, value);

    // 락 해제
    await release();
    return result;
  }

  async delete(key: string) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(this.redisClient, key);
    const result = await this.redisClient.del(key);

    // 락 해제
    await release();
    return result;
  }
}
