import subjectRepository from "../repositories/subject.repository.js";
import subjectDto from "../dtos/subject.dto.js";

const getSubjectListById = async (user_id) => {
  const subjects = await subjectRepository.getSubjectList(user_id);
  const subject_list = subjectDto.subjectListDto(user_id, subjects);

  return subject_list;
};

const createSubjectById = async (user_id, subject_name) => {
  const subjects = await subjectRepository.createSubject(user_id, subject_name);
  const new_subject = subjectDto.newSubjectDto(subjects);

  return new_subject;
};

const deleteSubjectById = async (user_id, subject_id) => {
  const subject = await subjectRepository.deleteSubject(user_id, subject_id);
  const deleted_subject = subjectDto.deleteSubjectDto(subject);

  return deleted_subject;
};

export default {
  getSubjectListById,
  createSubjectById,
  deleteSubjectById,
};
