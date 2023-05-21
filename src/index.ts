import express, { type Application } from "express";
import appDataSource from "./typeorm.config";
import sanitizedConfig from "./config";
import error from "./utils/error";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes, userRoutes, postRoutes } from "./routes";

const bootstrap = async (app: Application): Promise<void> => {
  await appDataSource.initialize();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieParser("", {
      decode: (val) => {
        return val;
      },
    })
  );

  //Routes

  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/posts", postRoutes);

  /////// ********************************Routes

  app.use(error);

  if (appDataSource.isInitialized) {
    app.listen(sanitizedConfig.PORT, () => {
      console.log(`Server Running on: ${sanitizedConfig.PORT}`);
    });
  }
};

bootstrap(express());
