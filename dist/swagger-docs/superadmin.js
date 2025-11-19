const superAdminDocs = {
    "/super-admin": {
        post: {
            tags: ["Super Admin"],
            summary: "Create a super admin",
            description: "Create a new super admin account. This is rarely used and should be restricted.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                                password: { type: "string" },
                            },
                            required: ["name", "email", "password"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Super admin created successfully",
                },
                400: { description: "Bad request" },
            },
        },
    },
    // -------- USERS ----------
    "/super-admin/users": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all users",
            description: "Fetch a list of all registered users.",
            responses: {
                200: { description: "Users fetched successfully" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/admins": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all admins",
            description: "Fetch a list of all admin accounts.",
            responses: {
                200: { description: "Admins fetched successfully" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/users/{userId}": {
        put: {
            tags: ["Super Admin"],
            summary: "Update user",
            description: "Update details of a specific user.",
            parameters: [
                {
                    name: "userId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
            },
            responses: {
                200: { description: "User updated successfully" },
                400: { description: "Bad request" },
            },
        },
        delete: {
            tags: ["Super Admin"],
            summary: "Delete user",
            description: "Delete a user from the system.",
            parameters: [
                {
                    name: "userId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            responses: {
                200: { description: "User deleted successfully" },
                400: { description: "Bad request" },
            },
        },
    },
    // -------- PROPERTIES ----------
    "/super-admin/properties": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all properties",
            description: "Fetch all properties in the system.",
            responses: {
                200: { description: "Properties fetched successfully" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/properties/{propertyId}": {
        put: {
            tags: ["Super Admin"],
            summary: "Update property",
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { type: "object", additionalProperties: true },
                    },
                },
            },
            responses: {
                200: { description: "Property updated" },
                400: { description: "Bad request" },
            },
        },
        delete: {
            tags: ["Super Admin"],
            summary: "Delete property",
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            responses: {
                200: { description: "Property deleted" },
                400: { description: "Bad request" },
            },
        },
    },
    // -------- APPLICATIONS ----------
    "/super-admin/applications": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all applications",
            description: "Retrieve all rental applications.",
            responses: {
                200: { description: "Applications fetched" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/applications/{applicationId}/status": {
        put: {
            tags: ["Super Admin"],
            summary: "Override application status",
            description: "Update the status of a rental application (e.g., APPROVED, DENIED).",
            parameters: [
                {
                    name: "applicationId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: { type: "string", example: "APPROVED" },
                            },
                            required: ["status"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Status updated" },
                400: { description: "Bad request" },
            },
        },
    },
    // -------- LEASES ----------
    "/super-admin/leases": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all leases",
            description: "Fetch all lease agreements.",
            responses: {
                200: { description: "Leases fetched" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/leases/{leaseId}": {
        put: {
            tags: ["Super Admin"],
            summary: "Override lease details",
            parameters: [
                {
                    name: "leaseId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { type: "object", additionalProperties: true },
                    },
                },
            },
            responses: {
                200: { description: "Lease updated" },
            },
        },
        delete: {
            tags: ["Super Admin"],
            summary: "Delete lease",
            parameters: [
                {
                    name: "leaseId",
                    in: "path",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            responses: {
                200: { description: "Lease deleted" },
            },
        },
    },
    // -------- PAYMENTS ----------
    "/super-admin/payments": {
        get: {
            tags: ["Super Admin"],
            summary: "Get all payments",
            description: "Fetch all recorded payments.",
            responses: {
                200: { description: "Payments fetched" },
                500: { description: "Server error" },
            },
        },
    },
    "/super-admin/payments/{paymentId}": {
        put: {
            tags: ["Super Admin"],
            summary: "Override payment record",
            parameters: [
                {
                    name: "paymentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { type: "object", additionalProperties: true },
                    },
                },
            },
            responses: {
                200: { description: "Payment updated" },
            },
        },
    },
};
export default superAdminDocs;
//# sourceMappingURL=superadmin.js.map