import express from "express";
import { getAllUser, getRoomUser, getUser } from "../controllers/user";

const router = express.Router();

router.get("/get-user", getUser.controller);
router.post("/get-all", getAllUser.validator, getAllUser.controller);
router.post("/get-room-users", getRoomUser.validator, getRoomUser.controller);

export default router;

