import nodemailer from 'nodemailer';
export async function sendEmail(email, subject, message, html) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const send = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: subject,
        text: message,
        html: html,
    });
    return send;
}
//# sourceMappingURL=email.js.map