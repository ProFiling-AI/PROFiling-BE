import professorlistRepository from "../repositories/professorlist.repository.js";

const professorlistService = {
    getProfessorsByUserId: async (userId) => {
// 1. DB(또는 데이터 저장소)에서 userId로 교수 데이터 조회
    const professors = await professorlistRepository.findByUserId(userId);

// 2. 받아온 원본 데이터에서 필요한 필드만 추출해 응답 형식 맞춤
    return professors.map((p) => ({
        professor_name: p.professor_name,
        department: p.department,
        gender: p.gender,
        subject_name: p.subject_name
    }));
}
};

export default professorlistService;
