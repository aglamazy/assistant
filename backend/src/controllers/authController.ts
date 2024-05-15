import {Request, Response} from 'express';
import {createUser, findUserByEmail, UserStatus} from '../models/userModel';
import bcrypt from 'bcrypt';
import {createToken} from "../utils/tokens";
import {userHelper} from "../helpers/userHelper";

export async function register(req: Request, res: Response) {
    const {email, password} = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({email, password: hashedPassword, status: UserStatus.Pending});
        const payload = {user: newUser};
        const verificationToken = createToken(payload); // Implement createToken as needed
        await userHelper.sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).send('User registered, verify email to activate');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}
