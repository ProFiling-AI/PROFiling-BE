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

const addBookmark = async (user_id, recording_id, timestamp) => {
  try {
    const recording = await prisma.recording.findFirst({
      where: {
        id: Number(recording_id),
        subject: {
          user_id: user_id,
        },
      },
      select: { id: true },
    });

    if (!recording) {
      throw new recordingError.RecordingNotFoundError(
        "녹음 파일을 찾을 수 없습니다."
      );
    }

    return await prisma.bookmark.create({
      data: {
        recording_id: Number(recording_id),
        timestamp: timestamp,
      },
      select: {
        id: true,
        recording_id: true,
        timestamp: true,
        created_at: true,
      },
    });
  } catch (error) {
    if (error instanceof recordingError.RecordingNotFoundError) {
      throw error;
    }
    throw new recordingError.BookmarkAddError("Error on adding bookmark");
  }
};

export default {
  getRecordingList,
  addBookmark,
};
