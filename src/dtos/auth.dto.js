const registerDto = (body) => {
  const email = body.email;
  const password = body.password;
  const verification_id = body.verificationId;
  const nickname = body.nickname;
  return { email, password, nickname, verification_id };
};

const emailVerificationCodeDto = (body) => {
  const verification_code = body.verificationCode;
  const email = body.email;
  return { verification_code, email };
};

export default {
  registerDto,
  emailVerificationCodeDto,
};
