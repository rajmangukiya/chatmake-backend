import { Application } from "express";
import user from "./user";
import room from "./room";
import message from "./message"
import auth from "./auth"
import jwt from "express-jwt";


export const setup = (app: Application) => {

  app.use(
    "/api/v1",
    jwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET }).unless({
      path: [
        "/api/v1/auth/google",
        "/api/v1/auth/google/callback",
      ],
    })
  );

  app.use("/api/v1/user", user);
  app.use("/api/v1/room", room);
  app.use("/api/v1/message", message);
  app.use("/api/v1/auth/google", auth);

};
