import authService from "../services/auth.service.js";
import authDTO from "../dtos/auth.dto.js";

const register = async (req, res, next) => {
  try {
    const dto = authDTO.registerDto(req.body);
    const new_user = await authService.register(dto);
    return res.success(new_user, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default { register };
