import express from "express";
import { AuthController } from "../controller";
import appDataSource from "../typeorm.config";
import { User } from "../entities";

export const authRoutes = express.Router();

const authController = new AuthController(appDataSource.getRepository(User));

authRoutes.post("/login", authController.login);

export default authRoutes;
