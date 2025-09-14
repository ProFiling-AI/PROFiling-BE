const quizDto = (quiz, questions = []) => {
  return {
    quiz_id: quiz.id,
    title: quiz.title,
    quiz_type: quiz.type,
    attempt: quiz.attempt,
    questions: questions.map((q) => ({
      question_id: q.id,
      stem: q.stem,
      explanation: q.explanation,
      score: q.score,
    })),
  };
};

export default {
  quizDto,
};
