import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel";
import { registerValidator, loginValidator } from "../validations/auth";
import ApiError from "../utils/ApiError";
import { getUserByEmail } from "../services/user";

class AuthController {
  async getAllUser(req, res, next) {
    try {
      const user = await User.find();
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const { error } = registerValidator.validate(req.body);
      if (error) {
        const errors = error.details.map((err) => err.message).join(", ");
        throw new ApiError(StatusCodes.BAD_REQUEST, errors);
      }
      const emailExist = await getUserByEmail(email);
      if (emailExist)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email da duoc dang ky");
      const hashPassword = await bcryptjs.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashPassword,
      });
      // b4 remove password in res
      res.status(StatusCodes.OK).json({
        message: "Create Done",
        data: { ...user.toObject(), password: undefined },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { error } = loginValidator.validate(req.body);
      if (error) {
        const errors = error.details.map((err) => err.message).join(", ");
        throw new ApiError(StatusCodes.BAD_REQUEST, errors);
      }
      const checkUser = await getUserByEmail(email);
      if (!checkUser)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Tai khoan ko hop le");

      const checkPassword = await bcryptjs.compare(
        password,
        checkUser.password
      );
      if (!checkPassword)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Tai khoan ko hop le");

      const token = jwt.sign({ id: checkUser._id }, "process.env.SECRET_KEY", {
        expiresIn: "1w",
      });
      res.status(StatusCodes.OK).json({
        message: "Login ok",
        user: { ...checkUser.toObject(), password: undefined },
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const users = await User.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).json({
          message: "Not Found",
        });
      }
      res.status(200).json({
        message: "Delete Done",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default AuthController;
