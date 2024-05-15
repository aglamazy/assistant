import jwt from 'jsonwebtoken';
import {ITokenPayload} from "./types";

export const createToken = (payload: ITokenPayload, expiresIn: string = '1h'): string => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT secret key is not defined in environment variables.");
    }

    // Sign the JWT
    return jwt.sign(payload, secretKey, { expiresIn });
};
