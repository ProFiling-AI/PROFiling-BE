import morgan from "morgan";
import logger from "../logger.js"; // winston logger import
import dotenv from "dotenv";

dotenv.config(); // 환경 변수 설정

// 환경에 따라 로그 포맷 설정
const format = () =>
  process.env.NODE_ENV === "production" ? "combined" : "dev";

// 로그 작성을 위한 Output stream 옵션
const stream = {
  write: (message) => {
    logger.http(
      message.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      )
    );
  },
};

// 로깅 스킵 여부 설정
const skip = (_, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.statusCode < 400; // 상태 코드가 400 미만이면 로그를 기록하지 않음
  }
  return false; // 개발 환경에서는 모든 로그 기록
};

// morgan 미들웨어 생성
const morganMiddleware = morgan(format(), { stream, skip });

export default morganMiddleware;
