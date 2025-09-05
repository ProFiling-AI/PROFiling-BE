const subjectListDto = (user_id, list = []) => {
  return {
    user_id: user_id,
    subjects: list.map(({ id, subject_name }) => ({
      id,
      subject_name,
    })),
  };
};

const newSubjectDto = (subject) => {
  return {
    id: subject.id,
    subject_name: subject.subject_name,
  };
};

const deleteSubjectDto = (subject) => {
  return {
    subject_id: subject.subject_id,
    deleted_at: subject.deleted_at,
    affected_recordings: subject.affected_recordings,
  };
};

const renameSubjectDto = (subject) => {
  return {
    message: "과목명이 수정되었습니다.",
    subject_id: subject.id,
    subject_name: subject.subject_name,
  };
};

export default {
  subjectListDto,
  newSubjectDto,
  deleteSubjectDto,
  renameSubjectDto,
};
