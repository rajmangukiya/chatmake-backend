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
  url: "postgres://fashion_backend_database_user:xa1HTTXlnyR1kv9PxTrA7OVyaQEzs583@dpg-chnjcs1mbg5577m1ck90-a.oregon-postgres.render.com/fashion_backend_database",
  type: "postgres",
  // host: "ec2-44-193-228-249.compute-1.amazonaws.com",
  port: 5432,
  // username: "eqwcanknsdhwtp",
  // password: "6d364d0d14213c514e60f4bf50688c869896033ee195174d23a7c64a8c767878",
  // database: "chatmake_backend",
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
