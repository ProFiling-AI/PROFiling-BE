import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";

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

export default {
  getSubjectList,
};
