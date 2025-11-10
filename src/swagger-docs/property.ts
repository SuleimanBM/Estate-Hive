const propertyDocs = {
    "/upload-presigned-url": {
        post: {
            tags: ["Property"],
            summary: "Get presigned upload URLs",
            description: "Generate presigned URLs for uploading files to S3 (e.g., property images).",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                fileTypes: {
                                    type: "array",
                                    items: { type: "string", example: "image/png" },
                                },
                            },
                            required: ["fileTypes"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Presigned URLs generated",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    urls: {
                                        type: "array",
                                        items: { type: "string", example: "https://s3.aws.com/yourfile" },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid fileTypes input" },
                500: { description: "Failed to generate presigned URL" },
            },
        },
    },

    "/download-presigned-url": {
        post: {
            tags: ["Property"],
            summary: "Get download URLs for files",
            description: "Generate presigned URLs to download files previously uploaded to S3.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                fileKeys: {
                                    type: "array",
                                    items: { type: "string", example: "property-image-key" },
                                },
                            },
                            required: ["fileKeys"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Download URLs returned",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    urls: {
                                        type: "array",
                                        items: { type: "string", example: "https://s3.aws.com/yourfile" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/all-properties": {
        get: {
            tags: ["Property"],
            summary: "Get all properties",
            description: "Fetch all properties with optional search, filters, pagination, and sorting.",
            parameters: [
                { name: "title", in: "query", schema: { type: "string" }, description: "Search by title" },
                { name: "minPrice", in: "query", schema: { type: "number" }, description: "Minimum price" },
                { name: "maxPrice", in: "query", schema: { type: "number" }, description: "Maximum price" },
                { name: "city", in: "query", schema: { type: "string" } },
                { name: "region", in: "query", schema: { type: "string" } },
                { name: "country", in: "query", schema: { type: "string" } },
                { name: "amenities", in: "query", schema: { type: "array", items: { type: "string" } } },
                {
                    name: "status",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"],
                    },
                },
                { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                { name: "sortBy", in: "query", schema: { type: "string" } },
                { name: "sortOrder", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
            ],
            responses: {
                200: { description: "Properties list returned with success" },
            },
        },
    },

    "/{id}": {
        get: {
            tags: ["Property"],
            summary: "Get property by ID",
            description: "Fetch a single property by its UUID.",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            responses: {
                200: { description: "Property returned successfully" },
                404: { description: "Property not found" },
            },
        },
        patch: {
            tags: ["Property"],
            summary: "Update property",
            description: "Update property details (admin only).",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                description: { type: "string" },
                                address: { type: "string" },
                                price: { type: "number" },
                                amenities: { type: "array", items: { type: "string" } },
                                status: {
                                    type: "string",
                                    enum: ["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"],
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Property updated successfully" },
                400: { description: "Invalid request" },
                404: { description: "Property not found" },
            },
        },
        delete: {
            tags: ["Property"],
            summary: "Delete property",
            description: "Delete a property by ID (admin only).",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            responses: {
                204: { description: "Property deleted successfully" },
                404: { description: "Property not found" },
            },
        },
    },

    "/create": {
        post: {
            tags: ["Property"],
            summary: "Create a property",
            description: "Add a new property (admin only).",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", example: "Luxury Apartment" },
                                description: { type: "string" },
                                price: { type: "number", example: 1200 },
                                address: {
                                    type: "object",
                                    properties: {
                                        street: { type: "string" },
                                        city: { type: "string" },
                                        region: { type: "string" },
                                        country: { type: "string" },
                                        lat: { type: "number" },
                                        lon: { type: "number" },
                                    },
                                },
                                amenities: { type: "array", items: { type: "string" } },
                                status: {
                                    type: "string",
                                    enum: ["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"],
                                },
                            },
                            required: ["title", "price", "address"],
                        },
                    },
                },
            },
            responses: {
                201: { description: "Property created successfully" },
                400: { description: "Invalid request" },
            },
        },
    },
};

export default propertyDocs