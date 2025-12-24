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

export default {
  recordingListDto,
  bookmarkAddDto,
  bookmarkDeleteDto,
};
