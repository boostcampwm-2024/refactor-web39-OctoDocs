import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Redis, { Command } from 'ioredis';
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
    const release = await this.acquireLock(key);
    await this.redisClient.hset(key, Object.entries(value));

    // 락 해제
    await release();
  }

  async setField(key: string, field: string, value: string) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(key);
    const result = await this.redisClient.hset(key, field, value);

    // 락 해제
    await release();
    return result;
  }

  async delete(key: string) {
    // 락 획득할 수 있을 때만 set
    const release = await this.acquireLock(key);
    const result = await this.redisClient.del(key);

    // 락 해제
    await release();
    return result;
  }
  private async acquireLock(key: string, retryCount = 10, retryDelay = 100) {
    // retryCount만큼 시도
    for (let i = 0; i < retryCount; i++) {
      // mili초 단위 timestamp + 랜덤 숫자
      const value = Date.now().toString() + Math.random().toString();
      const acquireResult = await this.redisClient.set(
        'user:' + key,
        value,
        'EX',
        10,
        'NX',
      );

      // 락 획득 성공
      if (acquireResult == 'OK') {
        const release = async () => {
          const releaseResult = await this.redisClient.eval(
            releaseScript,
            1,
            'user:' + key,
            value,
          );
          // 락 해제 성공
          if (releaseResult !== 1) {
            // 락 해제 실패
            throw new Error('락 해제 실패');
          }
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
}
