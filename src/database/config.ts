// import dotenv from "dotenv";

import { ConnectionOptions } from "typeorm";

// dotenv.config();

const development: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "chatMake",
  entities: ["src/api/entities/**/*.ts"],
  // migrations: ["src/migration/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
};

const test: ConnectionOptions = {
  name: "default",
  // url: "postgres://kxkpsxamyoxaov:541ea398d51e3a284a98caaee22e4cc2564f43f0d278425176b99eb4389124a5@ec2-44-196-44-90.compute-1.amazonaws.com:5432/daqutmq3hupqlr",
  type: "postgres",
  host: "ec2-44-196-44-90.compute-1.amazonaws.com",
  port: 5432,
  username: "kxkpsxamyoxaov",
  password: "541ea398d51e3a284a98caaee22e4cc2564f43f0d278425176b99eb4389124a5",
  database: "daqutmq3hupqlr",
  entities: ["src/api/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
  // logging: false,
  // dropSchema: false,
  // cli: {
  //   entitiesDir: 'src/**/entities',
  //   migrationsDir: 'src/database/migration',
  //   subscribersDir: 'src/subscriber',
  // },
  // ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const production: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: ["src/api/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
  logging: false,
};

export { development, production, test };
