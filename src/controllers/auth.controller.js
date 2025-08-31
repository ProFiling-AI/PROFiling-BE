import authService from "../services/auth.service.js";
import authDTO from "../dtos/auth.dto.js";
import authError from "../errors/auth.error.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res, next) => {
  try {
    const dto = authDTO.registerDto(req.body);
    const new_user = await authService.register(dto);
    return res.success(new_user, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const emailLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user_id = await authService.login(email, password);
    const { access_token, refresh_token } = authService.generateTokens({
      email: email,
      id: user_id,
    });
    return res.success(
      {
        userId: user_id,
        accessToken: access_token,
        refreshToken: refresh_token,
      },
      StatusCodes.OK
    );
  } catch (error) {
    next(error);
  }
};

const sendVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email;
    await authService.sendVerificationEmail(email);
    return res.success(
      { message: "인증 코드가 전송되었습니다." },
      StatusCodes.OK
    );
  } catch (error) {
    next(error);
  }
};

const checkEmailVerificationCode = async (req, res, next) => {
  try {
    const { email, verification_code } = authDTO.emailVerificationCodeDto(
      req.body
    );
    const email_verification = await authService.checkEmailVerificationCode(
      email,
      verification_code
    );
    return res.success(email_verification, StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};

const setNewPassword = async (req, res, next) => {
  try {
    const { email, new_password, confirm_password } = req.body;

    // 1) 새 비밀번호 & 확인 일치 체크
    if (new_password !== confirm_password) {
      throw new authError.PasswordMismatchError("비밀번호가 맞지 않습니다.");
    }

    // 2) 비밀번호 정책 검사
    const policy_ok = authService.validatePasswordPolicy(new_password);

    // 3) 비밀번호 변경
    await authService.resetPassword(email, new_password);

    return res.success(
      { message: "비밀번호가 재설정되었습니다." },
      StatusCodes.OK
    );
  } catch (error) {
    return next(error);
  }
};

export default {
  register,
  emailLogin,
  sendVerificationCode,
  checkEmailVerificationCode,
  setNewPassword,
};
