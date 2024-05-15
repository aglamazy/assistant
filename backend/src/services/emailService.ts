import nodemailer from 'nodemailer';

export const emailServices = {
    sendEmail: async (subject: string, to: string, email_body: string) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: email_body
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Verification email sent');
        } catch (error) {
            console.error('Error sending verification email', error);
        }
    }
}
