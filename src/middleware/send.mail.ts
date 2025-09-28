import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface TransporterConfig {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
}

const transporterConfig: TransporterConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!
    },
};

const transporter = nodemailer.createTransport(transporterConfig);

transporter.verify((error, success) => {
    if (error) {
        console.error("Error verifying transporter:", error);
    } else {
        console.log("Transporter is ready to send emails 🏍️📫.");
    }
});

export default transporter;