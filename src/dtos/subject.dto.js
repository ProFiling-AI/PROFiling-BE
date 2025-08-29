const subjectListDto = (user_id, list = []) => {
  return {
    user_id: user_id,
    subjects: list.map(({ id, subject_name }) => ({
      id,
      subject_name,
    })),
  };
};

export default {
  subjectListDto,
};
