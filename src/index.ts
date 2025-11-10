import express, { Express, Request, Response, NextFunction } from "express";

import routes from "./routes/index.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/mongodb.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet"
import cors from "cors"
import csurf from "csurf"
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { setupSwagger } from "./swagger.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST",],
    credentials: true
}))
//app.use(csurf({ cookie: true }));
const csrfProtection = csurf({ cookie: true });

interface CsrfRequest extends Request {
    csrfToken: () => string;
}

app.get("/csrf-token", csrfProtection, (req, res) => {
    const token = (req as CsrfRequest).csrfToken();
    res.json({ csrfToken: token });
});


app.post("/submit", csrfProtection, (req, res) => {
    res.send("Request passed CSRF check!");
});

// Routes
routes(app);

//Health check endpoint
app.put('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});


// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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