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

export default {
  getRecordingListById,
};
