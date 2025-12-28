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

const getMemoListById = async (user_id, recording_id) => {
  const memos = await recordingRepository.getMemoList(user_id, recording_id);
  const memo_list = recordingDto.memoListDto(memos);
  return memo_list;
};

const addMemoById = async (user_id, recording_id, title, content) => {
  const memo = await recordingRepository.addMemo(
    user_id,
    recording_id,
    title,
    content
  );
  const add_memo_list = recordingDto.addMemoDto(memo);
  return add_memo_list;
};

const deleteOneMemoById = async (user_id, recording_id, memo_id) => {
  const onememo = await recordingRepository.deleteOneMemo(
    user_id,
    recording_id,
    memo_id
  );
  const delete_memo = recordingDto.deleteOneMemoDto(onememo);
  return delete_memo;
};

const renameMemoById = async (
  user_id,
  recording_id,
  memo_id,
  title,
  content
) => {
  const memo = await recordingRepository.renameMemo(
    user_id,
    recording_id,
    memo_id,
    title,
    content
  );
  const rename_memo = recordingDto.renameMemoDto(memo);
  return rename_memo;
};

const renameRecordingById = async (user_id, recording_id, title) => {
  const recording = await recordingRepository.renameRecording(
    user_id,
    recording_id,
    title
  );
  const rename_recording = recordingDto.renameRecordingDto(recording);
  return rename_recording;
};

const deleteRecordingById = async (user_id, recording_id) => {
  const recording = await recordingRepository.deleteRecording(
    user_id,
    recording_id
  );
  const delete_recording = recordingDto.deleteRecordingDto(recording);
  return delete_recording;
};

export default {
  getRecordingListById,
  addBookmarkById,
  deleteBookmarkById,
  getBookmarkListById,
  getMemoListById,
  addMemoById,
  deleteOneMemoById,
  renameMemoById,
  renameRecordingById,
  deleteRecordingById,
};
