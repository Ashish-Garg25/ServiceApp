import express from "express";
import validate from "../middlewares/validator.js";
import { authencateToken } from "../middlewares/auth.js";
import { login, register, updateProfile } from "../controllers/user.js";
import { loginSchema, userValidationSchema } from "../middlewares/validationSchema.js";

const router = express.Router();

router.post('/register', validate(userValidationSchema), register);
router.post('/login', validate(loginSchema), login);
router.put('/update', authencateToken, updateProfile);

export default router;