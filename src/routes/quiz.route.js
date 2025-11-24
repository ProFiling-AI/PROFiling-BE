import express from "express";
import quizController from "../controllers/quiz.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, quizController.createQuiz);

export default router;
