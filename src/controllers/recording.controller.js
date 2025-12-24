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

export default {
  getRecordingList,
};
