import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";

const findProfessor = async (professor_id) => {
  try {
    return await prisma.professor.findMany({
      where: { id: professor_id },
      select: {
        name: true,
        department: true,
        gender: true,
        subject_name: true,
      },
    });
  } catch (error) {
    throw new authError.DataBaseError("Error on finding professor list");
  }
};

/*const createProfessorReview = async (professor_course_id, content) => {
  try {
    const created_review = await prisma.professorCourseReview.create({
      data: {
        professor_course_id: Number(professor_course_id),
        content,
      },
    });
    return created_review;
  } catch (error) {
    throw new authError.DataBaseError("Error on creating professor review");
  }
};
*/

const createProfessorReview = async (professor_course_id, content) => {
  try {
    const newReview = await prisma.professorCourseReview.create({
      data: {
        professor_course_id: Number(professor_course_id),
        content,
      },
    });

    // id 키를 review_id로 바꿔서 반환
    return {
      review_id: newReview.id,
      professor_course_id: newReview.professor_course_id,
      content: newReview.content,
      created_at: newReview.created_at,
    };
  } catch (error) {
    throw new authError.DataBaseError("Error on creating professor review");
  }
};

export default {
  findProfessor,
  createProfessorReview,
};
