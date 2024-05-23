import jwt from 'jsonwebtoken';
import {ITokenPayload} from "./types";

export const createToken = (payload: ITokenPayload, expiresIn: string = '1h'): string => {
    const secretKey = process.env.JWT_PRIVATE_KEY;
    if (!secretKey) {
        throw new Error("JWT secret key is not defined in environment variables.");
    }

    // Sign the JWT
    return jwt.sign(payload, secretKey, { expiresIn });
};

export function verifyToken(token: string): any {
    const secretKey = process.env.JWT_PRIVATE_KEY!;
    return jwt.verify(token, secretKey);
}
