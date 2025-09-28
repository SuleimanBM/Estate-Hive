import nodemailer from 'nodemailer';
export async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const url = `${process.env.APP_URL}/verify-email?token=${token}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Verify your email',
        html: `<p>Please verify your email by clicking <a href="${url}">here</a></p>`,
    });
}
//# sourceMappingURL=email.js.map