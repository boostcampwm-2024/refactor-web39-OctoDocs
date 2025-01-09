import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';
const RED_LOCK_TOKEN = 'RED_LOCK';

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
    await this.redisClient.hset(key, Object.entries(value));
  }

  async setField(key: string, field: string, value: string) {
    return await this.redisClient.hset(key, field, value);
  }

  async delete(key: string) {
    return await this.redisClient.del(key);
  }
}
