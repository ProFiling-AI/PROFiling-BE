import express from "express";
import recordingController from "../controllers/recording.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", authMiddleware, recordingController.getRecordingList);
router.post(
  "/:recording_id/bookmarks",
  authMiddleware,
  recordingController.addBookmark
);
router.delete(
  "/:recording_id/bookmarks/:bookmark_id",
  authMiddleware,
  recordingController.deleteBookmark
);

export default router;
