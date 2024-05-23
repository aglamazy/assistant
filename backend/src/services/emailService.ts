import nodemailer from 'nodemailer';

export const emailServices = {
    sendEmail: async (subject: string, to: string, email_body: string) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: email_body
        };

        const response = await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    }
}
