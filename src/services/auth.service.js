import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository.js";
import authError from "../errors/auth.error.js";

const register = async (signup_data) => {
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

  return {
    email: new_user.email,
    name: new_user.name,
    password: new_user.password,
    agreed_privacy: new_user.agreed_privacy,
    school: new_user.school,
  };
};

export default {
  register,
};
