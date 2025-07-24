import { PrismaClient } from "@prisma/client";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const prisma = new PrismaClient();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT), // 문자열을 숫자로 변환
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  max: 10, // connectionLimit
  idleTimeoutMillis: 30000, // 연결을 얼마나 오래 유지할지
  connectionTimeoutMillis: 2000, // 연결 시도 제한 시간
});

export default prisma;
