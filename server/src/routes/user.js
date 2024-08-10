import express from "express";
import validate from "../middlewares/validator.js";
import { authencateToken } from "../middlewares/auth.js";
import { resetPassword, getAddress, login, register, updateProfile, sendCode, forgotPassword, updateUser, sendOtp, verifyOtp } from "../controllers/user.js";
import { loginSchema, userValidationSchema } from "../middlewares/validationSchema.js";

const router = express.Router();

router.post('/register', validate(userValidationSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/resetPassword', authencateToken, resetPassword);
router.post('/sendCode', authencateToken, sendCode);
router.post('/forgotPassword', forgotPassword);
router.put('/update', authencateToken, updateProfile);
router.patch('/user', authencateToken, updateUser);
router.get('/address', authencateToken, getAddress);

export default router;