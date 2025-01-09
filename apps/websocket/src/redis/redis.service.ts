import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

type RedisPage = {
  title?: string;
  content?: string;
};

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) private readonly redisClient: Redis,
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
    await this.redisClient.hset(key, Object.entries(value));
  }

  async setFields(key: string, map: Record<string, string>) {
    // return await this.redisClient.hset(key, );
    // fieldValueArr 배열을 평탄화하여 [field, value, field, value, ...] 형태로 변환
    const flattenedFields = Object.entries(map).flatMap(([field, value]) => [
      field,
      value,
    ]);

    // hset을 통해 한 번에 여러 필드를 설정
    return await this.redisClient.hset(key, ...flattenedFields);
  }

  async delete(key: string) {
    return await this.redisClient.del(key);
  }
}
