import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import professorRoutes from "./routes/professor.route.js";
import subjectRoutes from "./routes/subject.route.js";
import morganMiddleware from "./middlewares/morganMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import logger from "./logger.js";
import mongoose from "mongoose";
import connectMongo from "./mongo.config.js";

dotenv.config();
const app = express();

// ✅ 공통 응답 헬퍼 미들웨어를 가장 먼저 등록
app.use((req, res, next) => {
  res.success = (success, status_code) =>
    res
      .status(status_code)
      .json({ resultType: "SUCCESS", error: null, success });

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    logger.error(`Error occurred: ${errorCode}, Reason: ${reason}`);
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next(); // ✅ 일반 요청 흐름을 유지
});

// ✅ 그다음 일반 미들웨어들 추가
app.use(morganMiddleware);
app.use(express.json());

// ✅ API 라우트 등록
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/professors", professorRoutes);
app.use("/api/v1/subject", subjectRoutes);

// ✅ 마지막으로 전역 오류 처리 미들웨어를 추가
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.log(err);
  logger.error(`Error occurred: ${err.message}`);
  res.status(err.statusCode).json({
    resultType: "FAIL",
    error: { errorCode: "internal_error", reason: err.message },
    success: null,
  });
});

(async () => {
  try {
    if (process.env.MONGO_URI) {
      await connectMongo();
    } else {
      logger.warn("MONGO_URI not set. Skipping MongoDB connection.");
    }
  } catch (e) {
    logger.error(`MongoDB connection failed: ${e.message}`);
  }
})();

export default app;
