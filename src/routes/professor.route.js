import express from "express";
import professorController from "../controllers/professor.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", professorController.getProfessorList);
router.get("/my", authMiddleware, professorController.getProfessorMy);
router.post(
  "/:professor_course_id/review",
  authMiddleware,
  professorController.postProfessorReview
);
router.post(
  "/:professor_course_id/exam",
  authMiddleware,
  professorController.postProfessorExam
);
router.get(
  "/:professor_course_id/review",
  authMiddleware,
  professorController.getProfessorReview
);
router.get(
  "/:professor_course_id/exam",
  authMiddleware,
  professorController.getProfessorExam
);
router.get("/search", professorController.getProfessorSearch);
router.delete("/delete", authMiddleware, professorController.deleteProfessorMy);

export default router;
