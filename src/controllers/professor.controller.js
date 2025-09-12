import professorService from "../services/professor.service.js";
import { StatusCodes } from "http-status-codes";

const getProfessorList = async (req, res, next) => {
  try {
    const professors = await professorService.getProfessorList();
    return res.success(professors, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getProfessorMy = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const professors = await professorService.getProfessorMy(user_id);
    return res.success(professors, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const postProfessorReview = async (req, res, next) => {
  try {
    const { professor_course_id } = req.params;
    const { rating, content } = req.body;

    const new_review = await professorService.postProfessorReview(
      professor_course_id,
      rating,
      content
    );
    return res.success(new_review, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const postProfessorExam = async (req, res, next) => {
  try {
    const { professor_course_id } = req.params;
    const { content } = req.body;

    const new_exam = await professorService.postProfessorExam(
      professor_course_id,
      content
    );
    return res.success(new_exam, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getProfessorList,
  getProfessorMy,
  postProfessorReview,
  postProfessorExam,
};
