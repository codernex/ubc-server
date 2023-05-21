import { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { User } from "../entities";
import { ErrorHandler, sendToken, validator } from "../utils";
import appDataSource from "../typeorm.config";
import * as bcrypt from "bcryptjs";

export class AuthController extends UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body as User;

    const errorValidation = validator({ username, password });

    if (errorValidation.length) {
      return next(new ErrorHandler(errorValidation, 404));
    }

    const userController = new AuthController(
      appDataSource.getRepository(User)
    );

    const user = await userController.findByUsername(username);

    if (!user) {
      return next(new ErrorHandler("Username or password invalid", 404));
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return next(new ErrorHandler("Username or password Invalid", 404));
    }

    sendToken(res, user, 200);
  }
}
