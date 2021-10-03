import express from "express";
import { addMessage, getMessage } from "../controllers/message";

const router = express.Router();

router.post("/add-message", addMessage.validator, addMessage.controller);
router.get("/get-message/:room", getMessage.validator, getMessage.controller);

export default router;