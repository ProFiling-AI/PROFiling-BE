import { StatusCodes } from "http-status-codes";
import subjectService from "../services/subject.service.js";

const getMySubjectList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const sort_by = req.query.sortBy || "latest";
    const subjects = await subjectService.getSubjectListById(user_id, sort_by);
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

const deleteMySubject = async (req, res, next) => {
  try {
    const subject_id = Number(req.params.id);
    const user_id = req.user.id;
    const subject = await subjectService.deleteSubjectById(user_id, subject_id);
    return res.success(subject, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const renameMySubject = async (req, res, next) => {
  try {
    const subject_id = Number(req.params.id);
    const user_id = req.user.id;
    const new_subject_name = req.body.subject_name;
    const subject = await subjectService.renameSubjectById(
      user_id,
      subject_id,
      new_subject_name
    );
    return res.success(subject, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const restoreMySubject = async (req, res, next) => {
  try {
    const subject_id = Number(req.params.id);
    const user_id = req.user.id;
    const subject = await subjectService.restoreSubjectById(
      user_id,
      subject_id
    );
    return res.success(subject, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const addFavoriteSubject = async (req, res, next) => {
  try {
    const subject_id = Number(req.params.id);
    const user_id = req.user.id;
    const is_favorite = req.body.is_favorite;
    const favorite_subject = await subjectService.addFavoriteSubjectById(
      user_id,
      subject_id,
      is_favorite
    );
    return res.success(favorite_subject, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getMySubjectList,
  createMySubject,
  deleteMySubject,
  renameMySubject,
  restoreMySubject,
  addFavoriteSubject,
};
