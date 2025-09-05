import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import authRepository from "../repositories/auth.repository.js";
import authError from "../errors/auth.error.js";
import sendmail from "../utils/sendmail.util.js";

const register = async (signup_data) => {
  // 인증 코드 확인
  const verification = await prisma.emailVerification.findUnique({
    where: { email },
  });
  if (!verification || verification.code !== code) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "인증 코드가 틀렸습니다." });
  }

  const existing_user = await authRepository.findByEmail(signup_data.email);
  if (existing_user) {
    throw new authError.UserAlreadyExistsError("Email already registered");
  }

  const hashed_password = await bcrypt.hash(signup_data.password, 10);

  const new_user = await authRepository.createUser({
    email: signup_data.email,
    name: signup_data.name,
    password: hashed_password,
    agreed_privacy: signup_data.agreed_privacy,
    school: signup_data.school,
  });

  // 인증 기록 삭제
  await prisma.emailVerification.delete({ where: { email } });

  return {
    email: new_user.email,
    name: new_user.name,
    password: new_user.password,
    agreed_privacy: new_user.agreed_privacy,
    school: new_user.school,
  };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new authError.UserNotExistError("존재하지 않는 이메일입니다.", {
      email,
    });
  }

  const is_password_valid = await bcrypt.compare(password, user.password);
  if (!is_password_valid) {
    throw new authError.PasswordMismatchError("비밀번호가 일치하지 않습니다.");
  }
  if (user.isDeleted) {
    throw new authError.UserQuitError("이미 탈퇴한 유저입니다.");
  }
  return user.id;
};

const generateTokens = (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
  return { access_token, refresh_token };
};

const generateCode = (size) => {
  return crypto
    .randomBytes(size / 2)
    .toString("hex")
    .toUpperCase();
};

const sendVerificationEmail = async (email) => {
  const verification_code = generateCode(6);

  // 전에 인증했던 코드 찾아서 있으면 삭제
  const email_verification = await authRepository.findEmailVerification(email);
  if (email_verification) {
    await authRepository.deleteEmailVerification(email);
  }

  const new_email_verification = {
    email,
    verificationCode: verification_code,
    codeExpires: new Date(Date.now() + 15 * 60 * 1000), // 유효기간=현재 시간 + 15분
  };

  await authRepository.createEmailVerification(new_email_verification);
  try {
    await sendmail.sendVerificationEmail(email, verification_code);
  } catch (error) {
    throw new authError.SendmailError("인증코드 전송 중 오류가 발생했습니다.");
  }
};

const checkEmailVerificationCode = async (email, verification_code) => {
  const email_verification = await authRepository.findEmailVerification(email);
  if (!email_verification) {
    throw new authError.EmailVerificationNotExistsError(
      "이메일 인증이 완료되지 않았습니다.",
      { email }
    );
  }

  const currentTime = Date.now();
  if (email_verification.codeExpires < currentTime) {
    throw new authError.EmailVerificationExpiredError(
      "인증 코드가 만료되었습니다.",
      { email }
    );
  }

  if (email_verification.verificationCode !== verification_code) {
    throw new authError.InvalidVerificationCodeError(
      "잘못된 인증 코드입니다.",
      { email }
    );
  }
  const updated_verification = await authRepository.setEmailVerifiedTrue(email);
  return updated_verification;
};

// 8자 이상 + (영문/숫자/특수문자) 중 3가지 이상
const validatePasswordPolicy = (pw) => {
  if (typeof pw !== "string" || pw.length < 8) return false;
  const has_letter = /[A-Za-z]/.test(pw);
  const has_digit = /[0-9]/.test(pw);
  const has_special = /[^A-Za-z0-9]/.test(pw);
  const policy_ok =
    [has_letter, has_digit, has_special].filter(Boolean).length >= 3;

  if (!policy_ok) {
    throw new authError.PasswordPolicyError("비밀번호 조건에 맞지 않습니다.");
  }
  return;
};

const resetPassword = async (email, new_password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new authError.UserNotExistError("존재하지 않는 이메일입니다.", {
      email,
    });
  }
  if (user.isDeleted) {
    throw new authError.UserQuitError("이미 탈퇴한 유저입니다.");
  }
  const hashed_password = await bcrypt.hash(new_password, 10);
  await authRepository.updateUserPassword(user.id, hashed_password);
  return user.id;
};

export default {
  register,
  generateTokens,
  login,
  sendVerificationEmail,
  checkEmailVerificationCode,
  validatePasswordPolicy,
  resetPassword,
};
