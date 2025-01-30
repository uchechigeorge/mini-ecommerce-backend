import "module-alias/register";

import { DataSource, DataSourceOptions, LoggerOptions } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import envOptions from "@config/env.config";

const migrationEnv = process.env.npm_config_env;

let configPath = envOptions.path;
if (migrationEnv) {
  configPath = envOptions.getPath(migrationEnv);
}

dotenv.config({ path: configPath });

const logging: LoggerOptions = [];
if (
  (process.env.TYPE_ORM_ENABLE_QUERY_LOGGING ?? "")?.toLowerCase() == "true"
) {
  logging.push("query");
}

const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST ?? "",
  username: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
  port: parseInt(process.env.DB_PORT || "5432"),
  entities: [path.join(__dirname, "../", "entities", "*.entity{.js,.ts}")],
  migrations: [path.join(__dirname, "../", "migrations", "*{.js,.ts}")],
  migrationsTableName: "_migrations",
  synchronize: (process.env.TYPE_ORM_SYNCHRONIZE ?? "").toLowerCase() == "true",
  logging,
  ssl: true,
};

export const AppDataSource = new DataSource(options);

export const initializeDb = async () => {
  await AppDataSource.initialize()
    .then((value) => {
      console.log("Data source initialized!");
    })
    .catch((reason) => {
      console.log("Data source initialization failed: ", reason);
    });
};

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();

    console.log("Data source re-initialized!");
  }

  return AppDataSource;
};
