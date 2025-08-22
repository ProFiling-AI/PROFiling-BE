import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";

const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new authError.DataBaseError("Error on finding user by email");
  }
};

const createUser = async (new_user) => {
  try {
    const created_user = await prisma.user.create({
      data: new_user,
    });
    return created_user;
  } catch (error) {
    throw new authError.DataBaseError("Error on creating user");
  }
};

// 이메일 인증 정보를 조회하는 함수
const findEmailVerification = async (email) => {
  const email_verification = await prisma.emailVerification.findUnique({
    where: { email },
  });
  return email_verification;
};

// 이메일 인증 정보를 삭제하는 함수
const deleteEmailVerification = async (email) => {
  try {
    const deleted = await prisma.emailVerification.delete({
      where: { email },
    });
    return deleted; // 삭제된 항목 반환
  } catch (error) {
    throw new authError.DataBaseError("Error on deleting email verification");
  }
};

// 이메일 인증 정보를 생성하는 함수
const createEmailVerification = async (new_email_verification) => {
  try {
    const created_verification = await prisma.emailVerification.create({
      data: new_email_verification,
    });
    return created_verification;
  } catch (error) {
    throw new authError.DataBaseError("Error on creating email verification");
  }
};

export default {
  findUserByEmail,
  createUser,
  findEmailVerification,
  deleteEmailVerification,
  createEmailVerification,
};
