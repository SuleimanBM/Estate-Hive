declare const propertyDocs: {
    "/upload-presigned-url": {
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
                                fileTypes: {
                                    type: string;
                                    items: {
                                        type: string;
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
                200: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    urls: {
                                        type: string;
                                        items: {
                                            type: string;
                                            example: string;
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
                500: {
                    description: string;
                };
            };
        };
    };
    "/download-presigned-url": {
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
                                fileKeys: {
                                    type: string;
                                    items: {
                                        type: string;
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
                200: {
                    description: string;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    urls: {
                                        type: string;
                                        items: {
                                            type: string;
                                            example: string;
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
    "/all-properties": {
        get: {
            tags: string[];
            summary: string;
            description: string;
            parameters: ({
                name: string;
                in: string;
                schema: {
                    type: string;
                    items?: undefined;
                    enum?: undefined;
                    default?: undefined;
                };
                description: string;
            } | {
                name: string;
                in: string;
                schema: {
                    type: string;
                    items?: undefined;
                    enum?: undefined;
                    default?: undefined;
                };
                description?: undefined;
            } | {
                name: string;
                in: string;
                schema: {
                    type: string;
                    items: {
                        type: string;
                    };
                    enum?: undefined;
                    default?: undefined;
                };
                description?: undefined;
            } | {
                name: string;
                in: string;
                schema: {
                    type: string;
                    enum: string[];
                    items?: undefined;
                    default?: undefined;
                };
                description?: undefined;
            } | {
                name: string;
                in: string;
                schema: {
                    type: string;
                    default: number;
                    items?: undefined;
                    enum?: undefined;
                };
                description?: undefined;
            })[];
            responses: {
                200: {
                    description: string;
                };
            };
        };
    };
    "/{id}": {
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
                    format: string;
                };
            }[];
            responses: {
                200: {
                    description: string;
                };
                404: {
                    description: string;
                };
            };
        };
        patch: {
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
                                title: {
                                    type: string;
                                };
                                description: {
                                    type: string;
                                };
                                address: {
                                    type: string;
                                };
                                price: {
                                    type: string;
                                };
                                amenities: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                status: {
                                    type: string;
                                    enum: string[];
                                };
                            };
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
                404: {
                    description: string;
                };
            };
        };
        delete: {
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
                204: {
                    description: string;
                };
                404: {
                    description: string;
                };
            };
        };
    };
    "/create": {
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
                                title: {
                                    type: string;
                                    example: string;
                                };
                                description: {
                                    type: string;
                                };
                                price: {
                                    type: string;
                                    example: number;
                                };
                                address: {
                                    type: string;
                                    properties: {
                                        street: {
                                            type: string;
                                        };
                                        city: {
                                            type: string;
                                        };
                                        region: {
                                            type: string;
                                        };
                                        country: {
                                            type: string;
                                        };
                                        lat: {
                                            type: string;
                                        };
                                        lon: {
                                            type: string;
                                        };
                                    };
                                };
                                amenities: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                status: {
                                    type: string;
                                    enum: string[];
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
                };
                400: {
                    description: string;
                };
            };
        };
    };
};
export default propertyDocs;
//# sourceMappingURL=property.d.ts.map