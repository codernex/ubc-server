import express, { Router } from "express";
import { UserController } from "../controller";

export const userRoutes: Router = express.Router();

userRoutes.route("/").post(UserController.createUser);

export default userRoutes;
