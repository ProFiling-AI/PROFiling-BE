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

export default {
  professorListDto,
  professorMyListDto,
  professorReviewDto,
  professorExamDto,
};
