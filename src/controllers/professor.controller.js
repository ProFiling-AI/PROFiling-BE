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

export default {
  getProfessorList,
};
