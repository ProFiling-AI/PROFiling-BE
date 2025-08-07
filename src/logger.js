import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import process from "process";
import dotenv from "dotenv";
dotenv.config();
const { combine, timestamp, label, printf } = winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  //* 로그 출력 형식 정의
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ label: "Hrr" }), // 어플리케이션 이름
    logFormat // log 출력 포맷
  ),
  //* 실제 로그를 어떻게 기록을 한 것인가 정의
  transports: [
    //* info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    //* error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
  //* uncaughtException 발생시 파일 설정
  exceptionHandlers: [
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

//* Production 환경이 아닌, 개발 환경일 경우
if (process.env.NODE_ENV !== "production") {
  // 콘솔에만 debug 로그 출력
  logger.add(
    new winston.transports.Console({
      level: "debug", // debug 레벨만 출력
      format: winston.format.combine(
        winston.format.colorize(), // 로그 레벨 색상 추가
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`; // 깔끔한 포맷
        })
      ),
    })
  );
}

export default logger;
