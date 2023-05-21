import { Response, NextFunction } from "express";
import { ErrorHandler } from "../utils";
import jwt from "jsonwebtoken";
import sanitizedConfig from "../config";
import appDataSource from "../typeorm.config";
import { User } from "../entities";
import { AppRequest } from "../types";

export class Auth {
  public static async isAuthenticated(
    req: AppRequest,
    _res: Response,
    next: NextFunction
  ) {
    const token: string =
      req.cookies.token || req.headers.authorization?.split(" ")[0];

    if (!token) {
      return next(new ErrorHandler("Unauthorized access", 401));
    }

    const { userId } = jwt.verify(token, sanitizedConfig.JWT_SECRET_KEY) as {
      userId: string;
    };

    const user = await appDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id=:userId", { userId })
      .getOne();

    if (!user) {
      return next(new ErrorHandler("JWT Mailformed", 401));
    }

    req.user = user;
    next();
  }

  public static authorizedRoles(...roles: string[]) {
    return (req: AppRequest, _res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(new ErrorHandler("Unauthorized access", 404));
      }
      if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler("Unauthorized Role For This Routes", 401));
      }
      next();
    };
  }
}
