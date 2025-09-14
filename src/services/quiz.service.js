import quizRepository from "../repositories/quiz.repository";
import quizDto from "../dtos/quiz.dto";

const generateQuizByAI = async (user_id, recording_id, quiz_type, title) => {
  // 1) AI 호출(예시로 하드코딩 더미)
  // 🚩 실제로는 aiClient.call(...) 해서 형식 맞춰 questions 배열 생성
  const ai_questions = Array.from({ length: numQuestions }).map((_, idx) => ({
    stem: `${idx + 1}. 1+1=2이다.`,
    explanation: "단순 연산이다.",
    isCorrectO: true, // 전부 O가 정답 (예시)
  }));

  // 2) 저장 (Repository)
  const { quiz, questions } = await quizRepository.createQuizWithAI({
    user_id,
    recording_id,
    quiz_type,
    title,
    questions: ai_questions,
  });

  // 3) 응답 DTO
  const response = quizDto.newSubjectDto(quiz, questions);
  return response;
};

export default {
  generateQuizByAI,
};
