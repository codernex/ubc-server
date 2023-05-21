import { Request } from "express";

export interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
}

export type AppRequest = Request & {
  user?: IUser;
};
