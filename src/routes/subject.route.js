import express from "express";
import subjectController from "../controllers/subject.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 내가 추가한 과목들의 리스트
router.get("/list/my", authMiddleware, subjectController.getMySubjectList);
router.post(
  "/create-subject",
  authMiddleware,
  subjectController.createMySubject
);
router.delete("/delete/:id", authMiddleware, subjectController.deleteMySubject);

export default router;
