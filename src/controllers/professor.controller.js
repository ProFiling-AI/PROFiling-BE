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

export default {
  getProfessorList,
  getProfessorMy,
};
