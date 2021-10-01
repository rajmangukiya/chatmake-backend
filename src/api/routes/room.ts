import express from "express";
import { createGroup, getAllGroups, makeOneChat } from "../controllers/room";

const router = express.Router();

router.post("/one-to-one", makeOneChat.validator, makeOneChat.controller);
router.get("/get-groups", getAllGroups.controller);
router.post("/create-group", createGroup.validator, createGroup.controller);

export default router;