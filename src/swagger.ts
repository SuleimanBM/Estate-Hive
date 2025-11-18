import swaggerUi from "swagger-ui-express";
import authDocs from "./swagger-docs/auth"
import propertyDocs from "./swagger-docs/property"
import applicationDocs from "./swagger-docs/applications"
import profileDocs  from "./swagger-docs/profile";
import superAdminDocs from "./swagger-docs/superadmin";

const swaggerSpec = {
    openapi: "3.1.0",
    info: {
        title: "Authentication API",
        version: "1.0.0",
        description: "Endpoints for user estate-hive.",
    },
    servers: [
        {
            // url: process.env.BASE_URL || 'http://localhost:3000',
            url: process.env.BASE_URL || 'http://localhost:3000',
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
        ...addBasePath(authDocs, "/api/auth"),
        ...addBasePath(profileDocs, "/api/profile"),
        ...addBasePath(propertyDocs, "/api/properties"),
        ...addBasePath(applicationDocs, "/api/application"),
        ...addBasePath(superAdminDocs, "/api/super-admin"),
    },
};

export function setupSwagger(app: any) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

function addBasePath(docs, basePath) {
    const newDocs = {};
    for (const [path, methods] of Object.entries(docs)) {
        newDocs[`${basePath}${path}`] = methods;
    }
    return newDocs;
}
