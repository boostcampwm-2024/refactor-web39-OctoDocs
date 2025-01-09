import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';
const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';
const RED_LOCK_TOKEN = 'RED_LOCK';

type RedisPage = {
  title?: string;
  content?: string;
};

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis,
    @Inject(RED_LOCK_TOKEN) private readonly redisLock: Redlock,
  ) {}

  createStream() {
    return this.redisClient.scanStream();
  }

  async get(key: string) {
    const data = await this.redisClient.hgetall(key);
    return Object.fromEntries(
      Object.entries(data).map(([field, value]) => [field, value]),
    ) as RedisPage;
  }

  async set(key: string, value: object) {
    // 락을 획득할 때까지 기다린다.
    const lock = await this.redisLock.acquire([`user:${key}`], 1000);
    try {
      await this.redisClient.hset(key, Object.entries(value));
    } finally {
      lock.release();
    }
  }

  async setFields(key: string, map: Record<string, string>) {
    // 락을 획득할 때까지 기다린다.
    const lock = await this.redisLock.acquire([`user:${key}`], 1000);
    try {
      // return await this.redisClient.hset(key, );
      // fieldValueArr 배열을 평탄화하여 [field, value, field, value, ...] 형태로 변환
      const flattenedFields = Object.entries(map).flatMap(([field, value]) => [
        field,
        value,
      ]);

      // hset을 통해 한 번에 여러 필드를 설정
      return await this.redisClient.hset(key, ...flattenedFields);
    } finally {
      lock.release();
    }
  }

  async delete(key: string) {
    // 락을 획득할 때까지 기다린다.
    const lock = await this.redisLock.acquire([`user:${key}`], 1000);
    try {
      return await this.redisClient.del(key);
    } finally {
      lock.release();
    }
  }
}
