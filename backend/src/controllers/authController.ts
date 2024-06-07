import { Request, Response } from 'express';
import { createUser, findUserByEmail, updateUser, UserStatus } from '../models/userModel';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from "../utils/tokens";
import { userHelper } from "../helpers/userHelper";
import Responses from "../utils/Responses";
import jwt from "jsonwebtoken";
import {IRegistrationForm, ResponseCodes} from "../common";

export async function register(req: Request, res: Response) {
    const form = req.body as IRegistrationForm;
    try {
        const existingUser = await findUserByEmail(form.email);
        let user;
        if (existingUser) {
            if (existingUser.status == UserStatus.Active) {
                return Responses.Conflict(res, "Try to login", ResponseCodes.UserActiveTryToLogin);
            }
            const sendDate = new Date(existingUser.last_registration_email);
            const now = new Date();
            const delta = now.getTime() - sendDate.getTime();
            const FIVE_MINUTES = 5 * 60 * 1000;
            if (delta < FIVE_MINUTES) {
                return Responses.Conflict(res, `You can try to register again in ${Math.round((FIVE_MINUTES - delta) / 1000)} seconds`, ResponseCodes.UserNeedToWaitToSendAgain);
            }
            user = existingUser;
        } else {
            // Create a user.
            const password = form.password;
            const hash = await bcrypt.hash(password, 10);
            user = await createUser({
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                hash,
                status: UserStatus.Pending
            });
        }
        const payload = { user };
        const verificationToken = createToken(payload);
        await userHelper.sendVerificationEmail(user.email, verificationToken);
        user.last_registration_email = new Date();
        await updateUser(user);
        return Responses.Ok(res, "Verification email sent");
    } catch (error) {
        console.error(error);
        return Responses.InternalServerError(res, "Can't register");
    }
}

export async function verifyEmail(req: Request, res: Response) {
    const token = req.body.token as string;
    try {
        const decoded = verifyToken(token); // Implement verifyToken as needed
        const user = await findUserByEmail(decoded.user.email);
        if (!user || user.status === UserStatus.Active) {
            return Responses.NotFound(res, "Invalid or expired token", ResponseCodes.InvalidOrExpiredToken);
        }
        user.status = UserStatus.Active;
        await updateUser(user);
        return Responses.Ok(res, "Email verified successfully");
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) {
            return Responses.InternalServerError(res, "Email verification failed. Token expired");
        }
        return Responses.InternalServerError(res, "Email verification failed");
    }
}
