import express from "express";
import { getAllUser, signup } from "../controllers/user";

const router = express.Router();

router.post("/auth/signup", signup.validator, signup.controller);
router.post("/get-all", getAllUser.validator, getAllUser.controller);

export default router;

