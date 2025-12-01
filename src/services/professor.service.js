import professorRepository from "../repositories/professor.repository.js";
import professorDTO from "../dtos/professor.dto.js";
import professorError from "../errors/professor.error.js";

const getProfessorList = async () => {
  // 1. DB(또는 데이터 저장소)에서 userId로 교수 데이터 조회
  const professors = await professorRepository.findProfessor();
  const professor_list = await professorDTO.professorListDto(professors);

  // 2. 받아온 원본 데이터에서 필요한 필드만 추출해 응답 형식 맞춤
  return { professor_list };
};

const getProfessorMy = async (user_id) => {
  const professors = await professorRepository.findProfessorMy(user_id);
  const professor_list = await professorDTO.professorMyListDto(professors);

  return { professor_list };
};

const postProfessorReview = async (professor_course_id, rating, content) => {
  return await professorRepository.createProfessorReview(
    professor_course_id,
    rating,
    content
  );
};

const postProfessorExam = async (professor_course_id, content) => {
  return await professorRepository.createProfessorExam(
    professor_course_id,
    content
  );
};

const getProfessorReview = async (professor_couse_id) => {
  const reviews = await professorRepository.findProfessorReview(
    professor_couse_id
  );
  const review_list = await professorDTO.professorReviewDto(reviews);

  return review_list;
};

const getProfessorExam = async (professor_couse_id) => {
  const exams = await professorRepository.findProfessorExam(professor_couse_id);
  const exam_list = await professorDTO.professorExamDto(exams);

  return exam_list;
};

const getProfessorSearch = async (keyword) => {
  const professors = await professorRepository.searchProfessor(keyword);
  const professor_search_list = professorDTO.professorSearchDto(professors);
  return professor_search_list;
};

const deleteProfessorMy = async (user_id, professor_course_id) => {
  const delete_professor = await professorRepository.deleteProfessorMy(
    user_id,
    professor_course_id
  );
  return professorDTO.professorMyDeleteDto(delete_professor);
};

const postProfessorMy = async (user_id, professor_course_id) => {
  const new_professor = await professorRepository.insertProfessorMy(
    user_id,
    professor_course_id
  );
  const professor_my_dto = professorDTO.professorMyPostDto(new_professor);
  return professor_my_dto;
};

export default {
  getProfessorList,
  getProfessorMy,
  postProfessorReview,
  postProfessorExam,
  getProfessorReview,
  getProfessorExam,
  getProfessorSearch,
  deleteProfessorMy,
  postProfessorMy,
};
