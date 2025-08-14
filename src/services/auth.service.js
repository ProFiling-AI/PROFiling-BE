import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/auth.repository.js";
import authError from "../errors/auth.error.js";

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

export default {
  register,
  generateTokens,
  login,
};
