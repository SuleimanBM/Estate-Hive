import nodemailer from 'nodemailer';


export async function sendEmail(email: string, subject: string, message: string, html?: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
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