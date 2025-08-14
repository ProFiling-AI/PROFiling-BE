import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", authController.emailLogin);
router.post("/signup", authController.register);

export default router;
