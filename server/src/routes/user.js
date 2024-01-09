import express from "express";
import validate from "../middlewares/validator.js";
import { authencateToken } from "../middlewares/auth.js";
import { login, register } from "../controllers/user.js";
import { loginSchema, userValidationSchema } from "../middlewares/validationSchema.js";

const router = express.Router();

router.post('/register', validate(userValidationSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;