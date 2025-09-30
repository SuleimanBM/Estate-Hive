import express from "express";
// import adminRoutes from "./routes/admin.route.js";
// import userRoutes from "./routes/auth.route.js";
// import superAdminRoutes from "./routes/super.admin.routes.js";
// import propertyRoutes from "./routes/property.route.js";
// import paystackRoutes from "./routes/paystack.routes.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/mongodb.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
// Load environment variables
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
// Configuring the pathnames for files and directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST",],
    credentials: true
}));
// Static files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
// Connect to database
connectToDB();
// Routes
routes(app);
//Health check endpoint
app.put('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// 404 handler
// app.use('/*', (req: Request, res: Response) => {
//     res.status(404).json({
//         success: false,
//         message: `Route ${req.originalUrl} not found`
//     });
// });
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});
// Start server
const server = app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
export default app;
//# sourceMappingURL=index.js.map