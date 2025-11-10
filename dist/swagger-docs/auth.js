const authDocs = {
    "/register": {
        post: {
            tags: ["Auth"],
            summary: "Register a new user",
            description: "Create a new user account with name, email, password, and optional phone number.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "John Doe" },
                                email: { type: "string", example: "john@example.com" },
                                password: { type: "string", example: "strongPassword123" },
                                phone: { type: "string", example: "+233123456789" },
                            },
                            required: ["name", "email", "password"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Registration failed" },
            },
        },
    },
    "/verify-email": {
        get: {
            tags: ["Auth"],
            summary: "Verify user email",
            description: "Verify a user's email address using the provided verification token.",
            parameters: [
                {
                    name: "token",
                    in: "query",
                    required: true,
                    schema: { type: "string" },
                    description: "Verification token sent to user email",
                },
            ],
            responses: {
                200: {
                    description: "Email verified successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean" },
                                    message: { type: "string" },
                                    accessToken: { type: "string" },
                                    refreshToken: { type: "string" },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid or expired token" },
            },
        },
    },
    "/login": {
        post: {
            tags: ["Auth"],
            summary: "Login user",
            description: "Authenticate user with email and password and receive access/refresh tokens.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "john@example.com" },
                                password: { type: "string", example: "password123" },
                            },
                            required: ["email", "password"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login successful",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string" },
                                        },
                                    },
                                    accessToken: { type: "string" },
                                    refreshToken: { type: "string" },
                                },
                            },
                        },
                    },
                },
                401: { description: "Invalid credentials" },
            },
        },
    },
    "/refresh": {
        post: {
            tags: ["Auth"],
            summary: "Refresh access token",
            description: "Generate a new access token using a valid refresh token.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string" },
                            },
                            required: ["refreshToken"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Token refreshed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    accessToken: { type: "string" },
                                    refreshToken: { type: "string" },
                                },
                            },
                        },
                    },
                },
                401: { description: "Invalid or expired refresh token" },
            },
        },
    },
    "/logout": {
        post: {
            tags: ["Auth"],
            summary: "Logout user",
            description: "Invalidate the provided refresh token to logout the user.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string" },
                            },
                            required: ["refreshToken"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Logout successful" },
                400: { description: "Invalid token or already logged out" },
            },
        },
    },
    "/forgot-password": {
        post: {
            tags: ["Auth"],
            summary: "Request password reset",
            description: "Send a password reset code to the user's registered email.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "john@example.com" },
                            },
                            required: ["email"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Reset code sent successfully" },
                400: { description: "Error sending reset code" },
            },
        },
    },
    "/reset-password": {
        post: {
            tags: ["Auth"],
            summary: "Reset password",
            description: "Reset the user's password using the reset code sent to email.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "john@example.com" },
                                resetTokenCode: { type: "string", example: "123456" },
                                newPassword: { type: "string", example: "newPassword123" },
                            },
                            required: ["email", "resetTokenCode", "newPassword"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Password reset successfully" },
                400: { description: "Invalid or expired reset code" },
            },
        },
    },
};
export default authDocs;
//# sourceMappingURL=auth.js.map