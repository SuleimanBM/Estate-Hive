import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import csurf from "csurf";
import { setupSwagger } from "./swagger.js";
// Load environment variables
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
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
//app.use(csurf({ cookie: true }));
const csrfProtection = csurf({ cookie: true });
app.get("/csrf-token", csrfProtection, (req, res) => {
    const token = req.csrfToken();
    res.json({ csrfToken: token });
});
app.post("/submit", csrfProtection, (req, res) => {
    res.send("Request passed CSRF check!");
});
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
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});
setupSwagger(app);
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