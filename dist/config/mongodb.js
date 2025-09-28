import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectToDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }
        await mongoose.connect(mongoUri);
        console.log("Connected to database successfully 🚀");
    }
    catch (error) {
        console.error("Error caused by:", error);
        process.exit(1);
    }
};
//# sourceMappingURL=mongodb.js.map