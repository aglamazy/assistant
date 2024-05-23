import express from 'express';
import { register, verifyEmail } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyEmail);

export default authRouter;
