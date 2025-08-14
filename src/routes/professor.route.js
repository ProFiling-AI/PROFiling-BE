import express from "express";
import professorController from "../controllers/professor.controller.js";

const router = express.Router();

// 검색 전 모든 교수들의 리스트
router.get("/list", professorController.getProfessorList);

export default router;