import swaggerUi from "swagger-ui-express";
import authDocs from "./swagger-docs/auth"
import propertyDocs from "./swagger-docs/property"
import applicationDocs from "./swagger-docs/applications"

const swaggerSpec = {
    openapi: "3.1.0",
    info: {
        title: "Authentication API",
        version: "1.0.0",
        description: "Endpoints for user registration, login, token refresh, and password management.",
    },
    servers: [
        {
            url: "http://localhost:3000/api/auth",
            description: "Local development server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },

    paths: {
        ...authDocs,
        ...propertyDocs,
        ...applicationDocs,
    },
};

export function setupSwagger(app: any) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            urls: [
                {
                    url: `http://54.234.169.13:3000/swagger.json`,
                    name: 'API Docs',
                },
            ],
        },
    }));
}