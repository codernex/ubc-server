import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  JWT_SECRET_KEY: string | undefined;
  DB_NAME: string | undefined;
  DB_HOST: string | undefined;
  DB_USER: string | undefined;
  DB_PASS: string | undefined;
}

interface Config {
  NODE_ENV: "development" | "production";
  PORT: number;
  JWT_SECRET_KEY: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
