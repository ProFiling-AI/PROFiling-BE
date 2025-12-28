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

const restoreSubjectDto = (subject) => {
  return {
    message: "과목이 복구되었습니다.",
    subject_id: subject.updated.id,
    deleted_at: subject.updated.deleted_at,
    restored_recordings: subject.restored_recordings,
  };
};

const searchRecordingDto = (list = []) => {
  return list.map((recording) => {
    const duration_sec =
      recording.started_at && recording.ended_at
        ? Math.floor(
            (new Date(recording.ended_at) - new Date(recording.started_at)) /
              1000
          )
        : null;

    return {
      recording_id: recording.id,
      title: recording.title,
      duration_sec,
      started_at: recording.started_at,
    };
  });
};

export default {
  subjectListDto,
  newSubjectDto,
  deleteSubjectDto,
  renameSubjectDto,
  restoreSubjectDto,
  searchRecordingDto,
};
