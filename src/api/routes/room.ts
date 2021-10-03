import express from "express";
import { createGroup, getAllGroups, makeGroupChat, makeOneChat } from "../controllers/room";

const router = express.Router();

router.post("/one-to-one", makeOneChat.validator, makeOneChat.controller);
router.post("/group-chat", makeGroupChat.validator, makeGroupChat.controller);
router.get("/get-groups", getAllGroups.controller);
router.post("/create-group", createGroup.validator, createGroup.controller);

export default router;