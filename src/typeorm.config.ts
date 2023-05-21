import { DataSource } from "typeorm";
import sanitizedConfig from "./config";
import { User } from "./entities";

const appDataSource = new DataSource({
  type: "postgres",
  username: sanitizedConfig.DB_USER,
  password: sanitizedConfig.DB_PASS,
  host: "localhost",
  port: 5432,
  database: sanitizedConfig.DB_NAME,
  ssl: sanitizedConfig.NODE_ENV === "production",
  entities: [User],
  logging: sanitizedConfig.NODE_ENV === "development",
  synchronize: true,
});

export default appDataSource;
