import { Application } from "express";
import user from "./user";
import room from "./room";

export const setup = (app: Application) => {

  app.use("/api/v1/user", user);
  app.use("/api/v1/room", room);

};
