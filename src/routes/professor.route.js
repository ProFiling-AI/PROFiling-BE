import express from "express";
import professorController from "../controllers/professor.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 검색 전 모든 교수들의 리스트
router.get("/list", professorController.getProfessorList);
// 로그인한 사용자가 등록한 모든 교수들의 리스트
router.get("/my", authMiddleware, professorController.getProfessorMy);

export default router;
