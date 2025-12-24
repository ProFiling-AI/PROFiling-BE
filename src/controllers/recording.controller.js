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

export default {
  getRecordingList,
  addBookmark,
  deleteBookmark,
};
