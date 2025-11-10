const applicationDocs = {
    "/": {
        post: {
            tags: ["Application"],
            summary: "Create a new application",
            description: "Tenant can apply for a property with an optional message and attachments.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                propertyId: { type: "string", format: "uuid" },
                                message: { type: "string", example: "I would like to rent this property." },
                                attachments: {
                                    type: "array",
                                    items: { type: "string", format: "url", example: "https://example.com/file.jpg" },
                                },
                            },
                            required: ["propertyId"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Application created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean" },
                                    data: { type: "object" },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid request or error creating application" },
            },
        },
    },

    "/my": {
        get: {
            tags: ["Application"],
            summary: "List applications for tenant",
            description: "Tenant can fetch all their submitted applications.",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Applications returned successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean" },
                                    data: { type: "array", items: { type: "object" } },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/manager": {
        get: {
            tags: ["Application"],
            summary: "List applications for manager",
            description: "Manager or admin can fetch applications to review.",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Applications returned successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean" },
                                    data: { type: "array", items: { type: "object" } },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/{id}": {
        get: {
            tags: ["Application"],
            summary: "Get application by ID",
            description: "Fetch a single application using its UUID.",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            responses: {
                200: {
                    description: "Application returned successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean" },
                                    data: { type: "object" },
                                },
                            },
                        },
                    },
                },
                404: { description: "Application not found" },
            },
        },

        post: {
            tags: ["Application"],
            summary: "Approve application",
            description: "Manager can approve an application and optionally set lease dates and override rent/deposit.",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            requestBody: {
                required: false,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                startDate: { type: "string", format: "date", example: "2025-11-15" },
                                endDate: { type: "string", format: "date", example: "2026-11-15" },
                                rentAmount: { type: "number", example: 1200 },
                                depositAmount: { type: "number", example: 600 },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Application approved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: { success: { type: "boolean" }, data: { type: "object" } },
                            },
                        },
                    },
                },
                400: { description: "Invalid request or error approving application" },
            },
        },
    },

    "/{id}/deny": {
        post: {
            tags: ["Application"],
            summary: "Deny application",
            description: "Manager can deny an application and optionally provide a reason.",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            requestBody: {
                required: false,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                reason: { type: "string", example: "Incomplete documentation" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Application denied successfully",
                    content: {
                        "application/json": {
                            schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object" } } },
                        },
                    },
                },
                400: { description: "Invalid request or error denying application" },
            },
        },
    },

    "/{id}/withdraw": {
        post: {
            tags: ["Application"],
            summary: "Withdraw application",
            description: "Tenant can withdraw their application.",
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            ],
            responses: {
                200: {
                    description: "Application withdrawn successfully",
                    content: {
                        "application/json": {
                            schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object" } } },
                        },
                    },
                },
                400: { description: "Invalid request or error withdrawing application" },
            },
        },
    },
};

export default applicationDocs