import {Request, Response} from 'express';
import {createUser, findUserByEmail, UserStatus} from '../models/userModel';
import bcrypt from 'bcrypt';
import {createToken} from "../utils/tokens";
import {userHelper} from "../helpers/userHelper";
import {IRegistrationForm} from "../../../types"
import crypto from 'crypto';

export async function register(req: Request, res: Response) {
    const form = req.body as IRegistrationForm;
    try {
        const existingUser = await findUserByEmail(form.email);
        if (existingUser) {
            return res.status(409).send('Email already in use');
        }

        const password = crypto.randomBytes(8).toString('hex');

        const hash = await bcrypt.hash(password, 10);
        const newUser = await createUser({
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            hash,
            status: UserStatus.Pending
        });
        const payload = {user: newUser};
        const verificationToken = createToken(payload); // Implement createToken as needed
        await userHelper.sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).send('User registered, verify email to activate');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}
