import express, { Response, Request } from "express";
import { Auth } from "../middleware/auth";
import { IUser } from "../types";
export const postRoutes = express.Router();
postRoutes.get(
  "/",
  Auth.isAuthenticated,
  (req: Request & { user?: IUser }, res: Response) => {
    return res.json(req.user);
  }
);

export default postRoutes;
