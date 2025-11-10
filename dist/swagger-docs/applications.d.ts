declare const applicationDocs: {
    "/": {
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
                                propertyId: {
                                    type: string;
                                    format: string;
                                };
                                message: {
                                    type: string;
                                    example: string;
                                };
                                attachments: {
                                    type: string;
                                    items: {
                                        type: string;
                                        format: string;
                                        example: string;
                                    };
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
                                    success: {
                                        type: string;
                                    };
                                    data: {
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
    "/my": {
        get: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
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
                                    data: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    "/manager": {
        get: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
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
                                    data: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    "/{id}": {
        get: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
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
                                    data: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                404: {
                    description: string;
                };
            };
        };
        post: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                startDate: {
                                    type: string;
                                    format: string;
                                    example: string;
                                };
                                endDate: {
                                    type: string;
                                    format: string;
                                    example: string;
                                };
                                rentAmount: {
                                    type: string;
                                    example: number;
                                };
                                depositAmount: {
                                    type: string;
                                    example: number;
                                };
                            };
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
                                    success: {
                                        type: string;
                                    };
                                    data: {
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
    "/{id}/deny": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    "application/json": {
                        schema: {
                            type: string;
                            properties: {
                                reason: {
                                    type: string;
                                    example: string;
                                };
                            };
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
                                    success: {
                                        type: string;
                                    };
                                    data: {
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
    "/{id}/withdraw": {
        post: {
            tags: string[];
            summary: string;
            description: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
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
                                    data: {
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
};
export default applicationDocs;
//# sourceMappingURL=applications.d.ts.map