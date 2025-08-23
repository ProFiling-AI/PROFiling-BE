import authService from "../services/auth.service.js";
import authDTO from "../dtos/auth.dto.js";
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

export default {
  register,
  emailLogin,
  sendVerificationCode,
  checkEmailVerificationCode,
};
