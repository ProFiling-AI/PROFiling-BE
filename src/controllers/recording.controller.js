import recordingService from "../services/recording.service.js";
import { StatusCodes } from "http-status-codes";

const getRecordingList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const subject_id = req.query.subject_id;

    const recordings = await recordingService.getRecordingListById(
      user_id,
      subject_id
    );
    return res.success(recordings, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const addBookmark = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = req.params.recording_id;
    const timestamp = req.body.timestamp;

    const bookmark = await recordingService.addBookmarkById(
      user_id,
      recording_id,
      timestamp
    );
    return res.success(bookmark, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = Number(req.params.recording_id);
    const bookmark_id = Number(req.params.bookmark_id);

    const result = await recordingService.deleteBookmarkById(
      user_id,
      recording_id,
      bookmark_id
    );

    return res.success(result, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getBookmarkList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = Number(req.params.recording_id);

    const bookmarks = await recordingService.getBookmarkListById(
      user_id,
      recording_id
    );
    return res.success(bookmarks, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getMemoList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = Number(req.params.recording_id);
    const memos = await recordingService.getMemoListById(user_id, recording_id);
    return res.success(memos, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const addMemo = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = Number(req.params.recording_id);
    const { title, content } = req.body;
    const memo = await recordingService.addMemoById(
      user_id,
      recording_id,
      title,
      content
    );
    return res.success(memo, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const deleteOneMemo = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = req.params.recording_id;
    const memo_id = req.params.memo_id;
    const onememo = await recordingService.deleteOneMemoById(
      user_id,
      recording_id,
      memo_id
    );
    return res.success(onememo, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getRecordingList,
  addBookmark,
  deleteBookmark,
  getBookmarkList,
  getMemoList,
  addMemo,
  deleteOneMemo,
};
