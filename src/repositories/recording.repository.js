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

const deleteBookmark = async (user_id, recording_id, bookmark_id) => {
  try {
    // 1) 북마크 존재 + 권한 확인
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: Number(bookmark_id),
        recording_id: Number(recording_id),
        recording: {
          subject: {
            user_id: user_id,
          },
        },
      },
      select: {
        id: true,
        recording_id: true,
      },
    });

    if (!bookmark) {
      throw new recordingError.BookmarkNotFoundError(
        "북마크를 찾을 수 없습니다."
      );
    }

    // 2) 하드 삭제
    await prisma.bookmark.delete({
      where: { id: Number(bookmark_id) },
    });

    // 3) 응답용 데이터 리턴
    return {
      id: bookmark.id,
      recording_id: bookmark.recording_id,
    };
  } catch (error) {
    if (error instanceof recordingError.BookmarkNotFoundError) {
      throw error;
    }
    throw new recordingError.BookmarkDeleteError("Error on deleting bookmark");
  }
};

const getBookmarkList = async (user_id, recording_id) => {
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

    return await prisma.bookmark.findMany({
      where: {
        recording_id: Number(recording_id),
      },
      orderBy: [{ timestamp: "asc" }, { id: "asc" }], // ✅ 재생 위치 순 추천
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
    throw new recordingError.BookmarkListError(
      "Error on finding bookmark list"
    );
  }
};

const getMemoList = async (user_id, recording_id) => {
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

    return await prisma.memo.findMany({
      where: {
        recording_id: Number(recording_id),
      },
      select: {
        id: true,
        recording_id: true,
        title: true,
        content: true,
      },
    });
  } catch (error) {
    if (error instanceof recordingError.RecordingNotFoundError) {
      throw error;
    }
    throw new recordingError.MemoListError("Error on finding memo list");
  }
};

const addMemo = async (user_id, recording_id, title, content) => {
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

    const memo = await prisma.memo.create({
      data: {
        recording_id: Number(recording_id),
        title: title,
        content: content,
      },
    });
    return memo;
  } catch (error) {
    if (error instanceof recordingError.RecordingNotFoundError) {
      throw error;
    }
    throw new recordingError.MemoCreateError(
      "메모 생성 중 오류가 발생했습니다."
    );
  }
};

dayjs.extend(utc);
dayjs.extend(timezone);

const deleteOneMemo = async (user_id, recording_id, memo_id) => {
  const rid = Number(recording_id);
  const mid = Number(memo_id);
  const now = dayjs().tz("Asia/Seoul").toDate();

  try {
    return await prisma.$transaction(async (tx) => {
      const recording = await tx.recording.findFirst({
        where: {
          id: rid,
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

      const memo = await tx.memo.findFirst({
        where: {
          id: mid,
          recording_id: rid,
        },
        select: {
          id: true,
          recording_id: true,
          deleted_at: true,
        },
      });

      if (!memo) {
        throw new recordingError.MemoNotFoundError("메모를 찾을 수 없습니다.");
      }

      if (memo.deleted_at) {
        throw new recordingError.MemoAlreadyDeletedError(
          "이미 삭제된 메모입니다."
        );
      }

      // 4️⃣ soft delete
      const deletedMemo = await tx.memo.update({
        where: { id: mid },
        data: { deleted_at: now },
        select: {
          id: true,
          recording_id: true,
        },
      });

      return deletedMemo;
    });
  } catch (error) {
    if (
      error instanceof recordingError.RecordingNotFoundError ||
      error instanceof recordingError.MemoNotFoundError ||
      error instanceof recordingError.MemoAlreadyDeletedError
    ) {
      throw error;
    }
    throw new recordingError.DeleteMemoError("Error on deleting memo");
  }
};

const renameMemo = async (user_id, recording_id, memo_id, title, content) => {
  try {
    const normalizedTitle =
      typeof title === "string" && title.trim() !== ""
        ? title.trim()
        : undefined;
    const normalizedContent =
      typeof content === "string" && content.trim() !== ""
        ? content
        : undefined;

    const memo = await prisma.memo.findFirst({
      where: {
        id: Number(memo_id),
        recording_id: Number(recording_id),
        recording: {
          subject: {
            user_id: user_id,
          },
        },
      },
      select: { id: true },
    });
    if (!memo) {
      throw new recordingError.MemoNotFoundError("메모를 찾을 수 없습니다.");
    }

    const data = {
      ...(normalizedTitle !== undefined && { title: normalizedTitle }),
      ...(normalizedContent !== undefined && { content: normalizedContent }),
    };

    return await prisma.memo.update({
      where: { id: memo_id },
      data,
      select: {
        id: true,
        recording_id: true,
        title: true,
        content: true,
        updated_at: true,
      },
    });
  } catch (error) {
    if (error instanceof recordingError.MemoNotFoundError) {
      throw error;
    }
    throw new recordingError.RenameMemoError("Error on renaming memo");
  }
};

const renameRecording = async (user_id, recording_id, title) => {
  try {
    const existing = await prisma.recording.findFirst({
      where: { id: recording_id, user_id },
    });

    if (!existing) {
      throw new recordingError.RecordingNotFoundError(
        "해당 녹음파일을 찾을 수 없습니다."
      );
    }

    const updated = await prisma.recording.update({
      where: { id: recording_id },
      data: { title },
      select: { id: true, title: true },
    });

    return updated;
  } catch (error) {
    if (error instanceof recordingError.RecordingNotFoundError) {
      throw error;
    }
    throw new recordingError.ModifyRecordingError(
      "Error on renaming recording"
    );
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
  renameMemo,
  renameRecording,
};
