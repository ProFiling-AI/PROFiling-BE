import professorRepository from "../repositories/professor.repository.js";
import professorDTO from "../dtos/professor.dto.js";

const getProfessorList = async () => {
// 1. DB(또는 데이터 저장소)에서 userId로 교수 데이터 조회
    const professors = await professorRepository.findProfessor();
    const professor_list = await professorDTO.professorListDto(professors);

// 2. 받아온 원본 데이터에서 필요한 필드만 추출해 응답 형식 맞춤
    return {professor_list};
};

export default {
    getProfessorList,
};