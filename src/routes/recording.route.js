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
router.get(
  "/:recording_id/bookmarks",
  authMiddleware,
  recordingController.getBookmarkList
);
router.get(
  "/:recording_id/memo/list",
  authMiddleware,
  recordingController.getMemoList
);
router.post(
  "/:recording_id/memos",
  authMiddleware,
  recordingController.addMemo
);

export default router;
