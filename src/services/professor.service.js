import professorRepository from "../repositories/professor.repository.js";
import professorDTO from "../dtos/professor.dto.js";

const getProfessorList = async () => {
  const professors = await professorRepository.findProfessor();
  const professor_list = await professorDTO.professorListDto(professors);

  return { professor_list };
};

//로그인한 사용자가 등록한 교수 리스트 조회
const getProfessorMy = async (user_id) => {
  const professors = await professorRepository.findProfessorMy(user_id);
  const professor_list = await professorDTO.professorMyListDto(professors);

  return { professor_list };
};

export default {
  getProfessorList,
  getProfessorMy,
};
