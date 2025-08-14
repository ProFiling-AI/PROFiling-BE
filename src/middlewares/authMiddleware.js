import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../logger.js";

dotenv.config();

const authMiddleware = (req, res, next) => {
const authHeader = req.headers.authorization || req.headers.Authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn("Authorization header missing or malformed");
    return res.status(401).json({
    resultType: "FAIL",
    error: { errorCode: "unauthorized", reason: "토큰이 없습니다." },
    success: null,
    });
}

const token = authHeader.split(" ")[1].trim();

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰 페이로드에 사용자를 식별할 수 있는 id(혹은 sub)가 있어야 함
    // 만약 토큰에 id 대신 sub를 넣는다면 decoded.sub로 바꿔주세요.
    const userId = decoded.id ?? decoded.sub;
    if (!userId) {
    logger.warn("Token does not contain user id");
    return res.status(401).json({
        resultType: "FAIL",
        error: { errorCode: "unauthorized", reason: "유효하지 않은 토큰입니다." },
        success: null,
    });
    }

    // req.user에 필요한 값만 담아 다음 미들웨어/컨트롤러에서 사용
    req.user = { id: userId, ...(decoded.email ? { email: decoded.email } : {}) };
    next();
} catch (err) {
    logger.warn(`JWT verification failed: ${err.message}`);
    return res.status(401).json({
    resultType: "FAIL",
    error: { errorCode: "unauthorized", reason: "유효하지 않은 또는 만료된 토큰입니다." },
    success: null,
    });
}
};

export default authMiddleware;
