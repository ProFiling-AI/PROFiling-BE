import express from "express";
import professorlistController from "../controllers/professorlist.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 로그인한 사용자의 교수 리스트 조회
router.get("/my", authMiddleware, professorlistController.getMyProfessors);

export default router;