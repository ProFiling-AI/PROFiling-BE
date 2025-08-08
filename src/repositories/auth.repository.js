import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";

const findByEmail = async (email) => {
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

export default {
  findByEmail,
  createUser,
};
