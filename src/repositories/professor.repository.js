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

// 특정 userId로 등록된 교수들 조회
const findProfessorMy = async (user_id) => {
  try {
    return await prisma.userProfessorSubject.findMany({
      where: { user_id: user_id },
      select: {
        professor_course: {
          select: {
            professor_id: true,
            professor: {
              select: {
                name: true,
                department: true,
                gender: true,
                subject_name: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new authError.DataBaseError("Error on finding professor list");
  }
};

const createProfessorReview = async (professor_course_id, content) => {
  try {
    const new_review = await prisma.professorCourseReview.create({
      data: {
        professor_course_id: Number(professor_course_id),
        content,
      },
    });

    // id 키를 review_id로 바꿔서 반환
    return {
      review_id: new_review.id,
      professor_course_id: new_review.professor_course_id,
      content: new_review.content,
      created_at: new_review.created_at,
    };
  } catch (error) {
    throw new authError.DataBaseError("Error on creating professor review");
  }
};

export default {
  findProfessor,
  findProfessorMy,
  createProfessorReview,
};
