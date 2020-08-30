import dotenv from 'dotenv';
import { IS_PROD } from './constant';
import { createConnection } from 'typeorm';
import { Case } from './entity';

export const loadEnv = () => {
  dotenv.config({
    debug: !IS_PROD,
    path: IS_PROD ? '.env' : '.env.local'
  });
};

export const connectToMySql = () => {
  return createConnection({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [Case]
  });
};
