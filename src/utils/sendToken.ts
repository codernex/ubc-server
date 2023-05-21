import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import sanitizedConfig from "../config";
import { IUser } from "../types";

export function sendToken(res: Response, user: IUser, statusCode: number) {
  const token = jwt.sign({ userId: user.id }, sanitizedConfig.JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
  const options = {
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "none",
    secure: sanitizedConfig.NODE_ENV === "production",
  } as CookieOptions;

  res
    .cookie("token", token, options)
    .status(statusCode)
    .json({ user, access_token: token });
}
