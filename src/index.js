import dotenv from "dotenv";
import logger from "./logger.js";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT;

// 기본 엔드포인트
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 서버 실행
app.listen(port, "0.0.0.0", () => {
  logger.info(`🚀 Server listening on port ${port}`);
});
