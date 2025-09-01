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

const createMySubject = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const subject_name = req.body.subject_name;
    const subject = await subjectService.createSubjectById(
      user_id,
      subject_name
    );
    return res.success(subject, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getMySubjectList,
  createMySubject,
};
