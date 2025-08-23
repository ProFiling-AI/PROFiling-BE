import { School } from "@prisma/client";

const registerDto = (body) => {
  const email = body.email;
  const name = body.name;
  const password = body.password;
  const agreed_privacy = body.agreed_privacy;

  // 이메일에서 도메인 추출
  const domain = email.split("@")[1];
  const domain_parts = domain.split(".")[0];

  // Prisma enum 값 목록 추출
  const school_enum_values = Object.values(School);
  const upper_school = domain_parts.toUpperCase();
  // school enum에 포함되는지 확인
  const school = school_enum_values.includes(upper_school)
    ? upper_school
    : null;

  return { email, name, password, agreed_privacy, school };
};

const emailVerificationCodeDto = (body) => {
  const email = body.email;
  const verification_code = body.verification_code;
  return { email, verification_code };
};

export default {
  registerDto,
  emailVerificationCodeDto,
};
