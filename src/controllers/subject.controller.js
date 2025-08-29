import { StatusCodes } from "http-status-codes";
import subjectService from "../services/subject.service.js";

const getMySubjectList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const subjects = await subjectService.getSubjectListById(user_id);
    return res.success(subjects, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getMySubjectList,
};
