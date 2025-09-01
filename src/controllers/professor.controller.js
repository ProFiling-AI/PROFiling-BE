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

const postProfessorReview = async (req, res, next) => {
  try {
    const { professor_course_id } = req.params;
    const { content } = req.body;

    const newReview = await professorService.postProfessorReview(
      professor_course_id,
      content
    );

    return res.success(newReview, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getProfessorList,
  postProfessorReview,
};
