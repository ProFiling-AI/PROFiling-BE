const recordingListDto = (user_id, list = []) => {
  return list.map(({ id, subject_id, title, started_at }) => ({
    record_id: id,
    subject_id,
    title,
    started_at,
  }));
};

const bookmarkAddDto = (bookmark) => {
  return [
    {
      bookmark_id: bookmark.id,
      recording_id: bookmark.recording_id,
      timestamp: bookmark.timestamp,
      created_at: bookmark.created_at,
    },
  ];
};

const bookmarkDeleteDto = (bookmark) => {
  return {
    message: "북마크가 삭제되었습니다.",
    bookmark_id: bookmark.id,
    recording_id: bookmark.recording_id,
  };
};

const bookmarkListDto = (list = []) => {
  return list.map((bookmark) => ({
    bookmark_id: bookmark.id,
    recording_id: bookmark.recording_id,
    timestamp: bookmark.timestamp,
    created_at: bookmark.created_at,
  }));
};

const memoListDto = (list = []) => {
  return list.map((memo) => ({
    memo_id: memo.id,
    recording_id: memo.recording_id,
    title: memo.title,
    content: memo.content,
  }));
};

const addMemoDto = (memo) => {
  return {
    memo_id: memo.id,
    recording_id: memo.recording_id,
    title: memo.title,
    content: memo.content,
    created_at: memo.created_at,
  };
};

const deleteOneMemoDto = (memo) => {
  return {
    message: "메모가 삭제되었습니다.",
    memo_id: memo.id,
    recording_id: memo.recording_id,
  };
};

const renameMemoDto = (memo) => {
  return {
    message: "메모가 수정되었습니다.",
    memo_id: memo.id,
    recording_id: memo.recording_id,
    title: memo.title,
    content: memo.content,
  };
};

const renameRecordingDto = (recording) => {
  return {
    message: "녹음파일 제목이 수정되었습니다.",
    recording_id: recording.recording_id,
    title: recording.title,
  };
};

const deleteRecordingDto = (recording) => {
  return {
    message: "녹음파일이 삭제 되었습니다.",
    recording_id: recording.recording_id,
    deleted_at: recording.deleted_at,
  };
};

export default {
  recordingListDto,
  bookmarkAddDto,
  bookmarkDeleteDto,
  bookmarkListDto,
  memoListDto,
  addMemoDto,
  deleteOneMemoDto,
  renameMemoDto,
  renameRecordingDto,
  deleteRecordingDto,
};
