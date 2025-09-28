import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporterConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
};
const transporter = nodemailer.createTransport(transporterConfig);
transporter.verify((error, success) => {
    if (error) {
        console.error("Error verifying transporter:", error);
    }
    else {
        console.log("Transporter is ready to send emails 🏍️📫.");
    }
});
export default transporter;
//# sourceMappingURL=send.mail.js.map