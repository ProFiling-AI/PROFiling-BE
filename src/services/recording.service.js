import recordingRepository from "../repositories/recording.repository.js";
import recordingDto from "../dtos/recording.dto.js";

const getRecordingListById = async (user_id, subject_id) => {
  const recordings = await recordingRepository.getRecordingList(
    user_id,
    subject_id
  );
  const recording_list = recordingDto.recordingListDto(user_id, recordings);
  return recording_list;
};

const addBookmarkById = async (user_id, recording_id, timestamp) => {
  const bookmarks = await recordingRepository.addBookmark(
    user_id,
    recording_id,
    timestamp
  );
  const bookmark_list = recordingDto.bookmarkAddDto(bookmarks);
  return bookmark_list;
};

const deleteBookmarkById = async (user_id, recording_id, bookmark_id) => {
  const bookmark = await recordingRepository.deleteBookmark(
    user_id,
    recording_id,
    bookmark_id
  );
  const result = recordingDto.bookmarkDeleteDto(bookmark);
  return result;
};

const getBookmarkListById = async (user_id, recording_id) => {
  const bookmarks = await recordingRepository.getBookmarkList(
    user_id,
    recording_id
  );
  const bookmarks_list = recordingDto.bookmarkListDto(bookmarks);
  return bookmarks_list;
};

export default {
  getRecordingListById,
  addBookmarkById,
  deleteBookmarkById,
  getBookmarkListById,
};
