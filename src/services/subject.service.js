import subjectRepository from "../repositories/subject.repository.js";
import subjectDto from "../dtos/subject.dto.js";

const getSubjectListById = async (user_id) => {
  const subjects = await subjectRepository.getSubjectList(user_id);
  const subject_list = subjectDto.subjectListDto(user_id, subjects);

  return subject_list;
};

export default {
  getSubjectListById,
};
