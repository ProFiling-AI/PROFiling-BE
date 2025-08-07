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
  });

  return {
    id: new_user.id,
    email: new_user.email,
    name: new_user.name,
  };
};

export default {
  register,
};
