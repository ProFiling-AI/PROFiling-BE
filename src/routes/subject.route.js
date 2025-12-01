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
router.patch("/rename/:id", authMiddleware, subjectController.renameMySubject);
router.post("/restore/:id", authMiddleware, subjectController.restoreMySubject);
router.patch(
  "/:id/favorite",
  authMiddleware,
  subjectController.addFavoriteSubject
);
router.patch(
  "/:subject_id/professor",
  authMiddleware,
  subjectController.addMyprofessor
);

export default router;
