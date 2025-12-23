import { prisma } from "../db.config.js";
import recordingError from "../errors/recording.error.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

const getRecordingList = async (user_id, subject_id) => {
  try {
    return await prisma.recording.findMany({
      where: {
        subject_id: Number(subject_id),
        subject: {
          user_id: user_id,
        },
      },
      orderBy: [{ started_at: "desc" }, { id: "asc" }],
      select: {
        id: true,
        subject_id: true,
        title: true,
        started_at: true,
      },
    });
  } catch (error) {
    throw new recordingError.RecordingListError(
      "Error on finding recording list"
    );
  }
};

export default {
  getRecordingList,
};
