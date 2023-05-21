declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    JWT_SECRET_KEY: string;
    PORT: string;
  }
}
