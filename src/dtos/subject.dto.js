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

export default {
  subjectListDto,
  newSubjectDto,
};
