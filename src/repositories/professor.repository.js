import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";
import professorError from "../errors/professor.error.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

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
    throw new professorError.MyProfessorNoExistError(
      "Error on finding my professor list"
    );
  }
};

const createProfessorReview = async (professor_course_id, rating, content) => {
  try {
    if (!rating || rating < 1 || rating > 5) {
      throw new professorError.CreateProfessorRatingError(
        "Rating must be between 1 and 5"
      );
    }

    const new_review = await prisma.professorCourseReview.create({
      data: {
        professor_course_id: Number(professor_course_id),
        rating,
        content,
      },
    });

    // id 키를 review_id로 바꿔서 반환
    return {
      review_id: new_review.id,
      professor_course_id: new_review.professor_course_id,
      rating: new_review.rating,
      content: new_review.content,
      created_at: new_review.created_at,
    };
  } catch (error) {
    throw new professorError.CreateProfessorReviewError(
      "Error on creating professor review"
    );
  }
};

const createProfessorExam = async (professor_course_id, content) => {
  try {
    const new_exam = await prisma.professorCourseExam.create({
      data: {
        professor_course_id: Number(professor_course_id),
        content,
      },
    });

    return {
      exam_id: new_exam.id,
      professor_course_id: new_exam.professor_course_id,
      content: new_exam.content,
      created_at: new_exam.created_at,
    };
  } catch (error) {
    throw new professorError.CreateProfessorExamError(
      "Error on creating professor exam"
    );
  }
};

const findProfessorReview = async (professor_course_id) => {
  try {
    return await prisma.professorCourseReview.findMany({
      where: { professor_course_id },
      select: {
        professor_course_id: true,
        rating: true,
        content: true,
      },
    });
  } catch (error) {
    throw new professorError.FindProfessorReviewError(
      "Error on finding professor review list"
    );
  }
};

const findProfessorExam = async (professor_course_id) => {
  try {
    return await prisma.professorCourseExam.findMany({
      where: { professor_course_id },
      select: {
        professor_course_id: true,
        content: true,
      },
    });
  } catch (error) {
    throw new professorError.FindProfessorExamError(
      "Error on finding professor exam list"
    );
  }
};

const searchProfessor = async (keyword) => {
  try {
    return await prisma.professor.findMany({
      where: {
        OR: [
          { name: { contains: keyword } },
          { subject_name: { contains: keyword } },
        ],
      },
      select: {
        id: true,
        name: true,
        department: true,
        gender: true,
        subject_name: true,
      },
    });
  } catch (error) {
    throw new professorError.SearchProfessorError(
      "Error on searching professors"
    );
  }
};

dayjs.extend(utc);
dayjs.extend(timezone);

const deleteProfessorMy = async (user_id, professor_course_ids) => {
  const now = dayjs().tz("Asia/Seoul").toDate();

  try {
    return await prisma.$transaction(async (tx) => {
      const professors = await tx.userProfessorSubject.findMany({
        where: {
          user_id,
          professor_course_id: { in: professor_course_ids },
        },
        select: { id: true, professor_course_id: true, deleted_at: true },
      });

      if (professors.length === 0) {
        throw new professorError.DeleteProfessorMyError(
          "등록된 교수를 찾을 수 없습니다."
        );
      }

      const results = [];

      for (const professor of professors) {
        if (professor.deleted_at) {
          results.push({
            professor_course_id: professor.professor_course_id,
            deleted_at: professor.deleted_at,
            message: "이미 삭제된 교수입니다.",
          });
          continue;
        }

        await tx.userProfessorSubject.update({
          where: { id: professor.id },
          data: { deleted_at: now },
        });

        results.push({
          professor_course_id: professor.professor_course_id,
          deleted_at: now,
          message: "교수 삭제 완료",
        });
      }

      return results;
    });
  } catch (error) {
    throw new professorError.DeleteProfessorMyError(
      "Error on deleting my professor"
    );
  }
};

export default {
  findProfessor,
  findProfessorMy,
  createProfessorReview,
  createProfessorExam,
  findProfessorReview,
  findProfessorExam,
  searchProfessor,
  deleteProfessorMy,
};
