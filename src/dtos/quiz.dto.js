const resultQuizDto = (quiz, questions = [], desired_quiz_type_out = null) => {
  return {
    quiz_id: quiz.id,
    title: quiz.title,
    quiz_type: desired_quiz_type_out || quiz.type, // 기본값은 DB 타입, 외부표시용이 있으면 우선
    attempt: quiz.attempt ?? 1,
    questions: questions.map((q) => ({
      question_id: q.id,
      stem: q.stem,
      explanation: q.explanation,
      score: q.score ?? 10,
    })),
  };
};

export default {
  resultQuizDto,
};
