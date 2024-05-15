import {emailServices} from "../services/emailService";

export const userHelper = {
    sendVerificationEmail(userEmail: string, token: string) {
        const subject = 'Verify Your Email';
        const body = `Please verify your email by clicking on the link: ${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        return emailServices.sendEmail(subject, userEmail, body);
    }
}