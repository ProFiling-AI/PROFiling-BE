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

const getProfessorReview = async (req, res, next) => {
  try {
    const professor_course_id = Number(req.params.professor_course_id);
    const reviews = await professorService.getProfessorReview(
      professor_course_id
    );
    return res.success(reviews, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getProfessorExam = async (req, res, next) => {
  try {
    const professor_course_id = Number(req.params.professor_course_id);
    const exams = await professorService.getProfessorExam(professor_course_id);
    return res.success(exams, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getProfessorSearch = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        resultType: "FAIL",
        error: "검색 키워드를 입력하세요.",
        success: null,
      });
    }

    const professors = await professorService.getProfessorSearch(keyword);

    return res.status(StatusCodes.OK).json({
      resultType: "SUCCESS",
      error: null,
      success: professors,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfessorList,
  getProfessorMy,
  postProfessorReview,
  postProfessorExam,
  getProfessorReview,
  getProfessorExam,
  getProfessorSearch,
};
