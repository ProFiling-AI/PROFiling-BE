import { StatusCodes } from "http-status-codes";
import quizService from "../services/quiz.service.js";

const createQuiz = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const recording_id = req.body.recording_id;
    const quiz_type = req.body.quiz_type;
    const title = req.body.title;
    const new_quiz = await quizService.generateQuizByAI(
      user_id,
      recording_id,
      quiz_type,
      title
    );
    return res.success(new_quiz, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  createQuiz,
};
