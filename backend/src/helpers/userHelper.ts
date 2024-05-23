import {emailServices} from "../services/emailService";

export const userHelper = {
    sendVerificationEmail(userEmail: string, token: string) {
        const subject = 'Verify Your Email';
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        const body = `Please verify your email by clicking on the link: <a href="${verificationLink}">Verify Email</a>`;

        return emailServices.sendEmail(subject, userEmail, body);
    }
}