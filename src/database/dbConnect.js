import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const connectionString = isTest
  ? `postgres://${process.env.TEST_USER}:${process.env.TEST_PASS}@${process.env.TEST_HOST}:5432/${process.env.TEST_DATABASE}`
  : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? {
    rejectUnauthorized: false,
  } : false,
});

export default pool;
