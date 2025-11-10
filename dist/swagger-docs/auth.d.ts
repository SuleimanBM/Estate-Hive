declare const authDocs: {
    "/register": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                name: {
                                    type: string;
                                    example: string;
                                };
                                email: {
                                    type: string;
                                    example: string;
                                };
                                password: {
                                    type: string;
                                    example: string;
                                };
                                phone: {
                                    type: string;
                                    example: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                201: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    user: {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                            };
                                            name: {
                                                type: string;
                                            };
                                            email: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
            };
        };
    };
    "/verify-email": {
        get: {
            tags: string[];
            summary: string;
            description: string;
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                };
                description: string;
            }[];
            responses: {
                200: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    success: {
                                        type: string;
                                    };
                                    message: {
                                        type: string;
                                    };
                                    accessToken: {
                                        type: string;
                                    };
                                    refreshToken: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
            };
        };
    };
    "/login": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                email: {
                                    type: string;
                                    example: string;
                                };
                                password: {
                                    type: string;
                                    example: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    user: {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                            };
                                            name: {
                                                type: string;
                                            };
                                            email: {
                                                type: string;
                                            };
                                        };
                                    };
                                    accessToken: {
                                        type: string;
                                    };
                                    refreshToken: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                401: {
                    description: string;
                };
            };
        };
    };
    "/refresh": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                refreshToken: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    accessToken: {
                                        type: string;
                                    };
                                    refreshToken: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                401: {
                    description: string;
                };
            };
        };
    };
    "/logout": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                refreshToken: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                };
                400: {
                    description: string;
                };
            };
        };
    };
    "/forgot-password": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                email: {
                                    type: string;
                                    example: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                };
                400: {
                    description: string;
                };
            };
        };
    };
    "/reset-password": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                email: {
                                    type: string;
                                    example: string;
                                };
                                resetTokenCode: {
                                    type: string;
                                    example: string;
                                };
                                newPassword: {
                                    type: string;
                                    example: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                };
                400: {
                    description: string;
                };
            };
        };
    };
};
export default authDocs;
//# sourceMappingURL=auth.d.ts.map