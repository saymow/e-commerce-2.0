import Redis from 'ioredis';

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export default new Redis(redisConfig);
