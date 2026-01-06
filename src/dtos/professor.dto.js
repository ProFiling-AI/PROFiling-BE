const professorListDto = (list) => {
  return list.map((list) => ({
    professor_name: list.name,
    department: list.department,
    gender: list.gender,
    subject_name: list.subject_name,
  }));
};

const professorMyListDto = (list) => {
  return list.map((item) => ({
    professor_course_id: item.professor_course.id,
    professor_name: item.professor_course.professor.name,
    department: item.professor_course.professor.department,
    gender: item.professor_course.professor.gender,
    subject_name: item.professor_course.professor.subject_name,
  }));
};

const professorReviewDto = (list) => {
  return list.map((list) => ({
    professor_course_id: list.professor_course_id,
    rating: list.rating,
    content: list.content,
  }));
};

const professorExamDto = (list) => {
  return list.map((list) => ({
    professor_course_id: list.professor_course_id,
    content: list.content,
  }));
};

const professorSearchDto = (list) => {
  return list.map((list) => ({
    professor_id: list.id,
    professor_name: list.name,
    department: list.department,
    gender: list.gender,
    matched_subject: list.subject_name,
  }));
};

const professorMyDeleteDto = (list) => {
  return list.map((professor) => ({
    professor_course_id: professor.professor_course_id,
    deleted_at: professor.deleted_at,
    message: professor.message, // 이미 삭제됨 / 삭제 완료 등
  }));
};

const professorMyPostDto = (item) => ({
  professor_course_id: item.professor_course_id,
  id: item.id,
});

export default {
  professorListDto,
  professorMyListDto,
  professorReviewDto,
  professorExamDto,
  professorSearchDto,
  professorMyDeleteDto,
  professorMyPostDto,
};
