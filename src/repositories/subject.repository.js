import { prisma } from "../db.config.js";
import subjectError from "../errors/subject.error.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

const getSubjectList = async (user_id, sort_by = "latest") => {
  try {
    let order_by = [{ is_favorite: "desc" }];

    if (sort_by === "name") {
      order_by.push({ subject_name: "asc" }); // 이름순
    } else {
      order_by.push({ created_at: "desc" }); // 최신순
    }

    order_by.push({ id: "asc" });

    return await prisma.subject.findMany({
      where: { user_id, deleted_at: null },
      orderBy: order_by,
      select: {
        user_id: true,
        id: true,
        subject_name: true,
      },
    });
  } catch (error) {
    throw new subjectError.SubjectListError("Error on finding subject list");
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
    throw new subjectError.CreateSubjectError("Error on creating subject");
  }
};

dayjs.extend(utc);
dayjs.extend(timezone);

const deleteSubject = async (user_id, id) => {
  const now = dayjs().tz("Asia/Seoul").toDate();
  try {
    return await prisma.$transaction(async (tx) => {
      // 1) 폴더 있는지 확인
      const folder = await tx.subject.findFirst({
        where: { id, user_id },
        select: { id: true, deleted_at: true },
      });
      if (!folder)
        throw new subjectError.SubjectNotExistError("폴더를 찾을 수 없습니다.");

      if (folder.deleted_at) {
        // 폴더에 있는 녹음 파일 개수
        const affected = await tx.recording.count({
          where: { subject_id: id, user_id, deleted_at: null },
        });
        // 아직 살아있는 녹음이 있다면 같이 휴지통 처리
        if (affected > 0) {
          await tx.recording.updateMany({
            where: { subject_id: id, user_id, deleted_at: null },
            data: { deleted_at: now },
          });
        }
        return {
          subject_id: id,
          deleted_at: folder.deleted_at,
          affected_recordings: affected,
        };
      }

      // 2) 폴더 soft delete
      await tx.subject.update({
        where: { id: id },
        data: { deleted_at: now },
      });

      // 3) 해당 폴더 내 녹음 전체 soft delete
      const { count } = await tx.recording.updateMany({
        where: { subject_id: id, user_id, deleted_at: null },
        data: { deleted_at: now },
      });

      return { subject_id: id, deleted_at: now, affected_recordings: count };
    });
  } catch (error) {
    throw new subjectError.DeleteSubjectError("Error on deleting subject");
  }
};

const renameSubject = async (user_id, subject_id, subject_name) => {
  try {
    const existing = await prisma.subject.findFirst({
      where: { id: subject_id, user_id },
    });

    if (!existing) {
      throw new subjectError.SubjectNotExistError(
        "해당 과목을 찾을 수 없습니다."
      );
    }

    const updated = await prisma.subject.update({
      where: { id: subject_id },
      data: { subject_name },
      select: { id: true, subject_name: true },
    });

    return updated;
  } catch (error) {
    if (error instanceof subjectError.SubjectNotExistError) {
      throw error;
    }
    throw new subjectError.ModifySubjectError("Error on renaming subject");
  }
};

const restoreSubject = async (user_id, subject_id) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.subject.findFirst({
        where: { id: subject_id, user_id },
      });

      if (!existing) {
        throw new subjectError.SubjectNotExistError(
          "해당 과목을 찾을 수 없습니다."
        );
      }

      const updated = await tx.subject.update({
        where: { id: subject_id },
        data: { deleted_at: null },
        select: { id: true, deleted_at: true },
      });

      // 해당 폴더 내 녹음 전체 복구
      const { count } = await tx.recording.updateMany({
        where: { subject_id: subject_id, user_id },
        data: { deleted_at: null },
      });

      return { updated, restored_recordings: count };
    });
  } catch (error) {
    if (error instanceof subjectError.SubjectNotExistError) {
      throw error;
    }
    throw new subjectError.RestoreSubjectError("Error on restoring subject");
  }
};

const favoriteSubject = async (user_id, subject_id, is_favorite) => {
  try {
    const existing = await prisma.subject.findFirst({
      where: { id: subject_id, user_id },
    });

    if (!existing) {
      throw new subjectError.SubjectNotExistError(
        "해당 과목을 찾을 수 없습니다."
      );
    }
    const updated = await prisma.subject.update({
      where: { id: subject_id, user_id },
      data: { is_favorite },
      select: { id: true, is_favorite: true },
    });

    return updated;
  } catch (error) {
    if (error instanceof subjectError.SubjectNotExistError) {
      throw error;
    }
    throw new subjectError.AddFavoriteSubjectError(
      "Error on adding favorite subject"
    );
  }
};

export default {
  getSubjectList,
  createSubject,
  deleteSubject,
  renameSubject,
  restoreSubject,
  favoriteSubject,
};
