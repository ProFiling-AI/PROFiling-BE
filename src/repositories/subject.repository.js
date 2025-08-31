import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";
import subjectError from "../errors/subject.error.js";

const getSubjectList = async (user_id) => {
  try {
    return await prisma.subject.findMany({
      where: { user_id },
      select: {
        user_id: true,
        id: true,
        subject_name: true,
      },
    });
  } catch (error) {
    throw new authError.DataBaseError("Error on finding professor list");
  }
};

const createSubject = async (user_id, subject_name) => {
  try {
    const existing = await prisma.subject.findFirst({
      where: { user_id, subject_name, deleted_at: null },
    });
    if (existing) {
      throw new subjectError.SubjectAlreadyExistError(
        "이미 존재하는 과목명입니다."
      );
    }

    return await prisma.subject.create({
      data: { user_id, subject_name },
      select: { id: true, subject_name: true },
    });
  } catch (error) {
    if (error instanceof subjectError.SubjectAlreadyExistError) {
      throw error;
    }
    throw new authError.DataBaseError("Error on creating subject");
  }
};

export default {
  getSubjectList,
  createSubject,
};
