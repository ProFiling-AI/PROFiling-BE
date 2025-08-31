import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", authController.emailLogin);
router.post("/signup", authController.register);
router.post("/send-verify-email", authController.sendVerificationCode);
router.post(
  "/check-email-verification-code",
  authController.checkEmailVerificationCode
);
router.post("/new-password", authController.setNewPassword);

export default router;
