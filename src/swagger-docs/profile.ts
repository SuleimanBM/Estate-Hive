export const profileDocs = {
    "": {
        get: {
            tags: ["Auth"],
            summary: "Get user profile",
            description: "Retrieve the profile details of the currently authenticated user.",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "User profile fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "b71e2f3a-98f6-42a3-a233-91b312c0eabc" },
                                            name: { type: "string", example: "John Doe" },
                                            email: { type: "string", example: "john@example.com" },
                                            phone: { type: "string", example: "+233501234567" },
                                            photoUrl: { type: "string", example: "https://example.com/profile.jpg" },
                                            address: { type: "string", example: "Accra, Ghana" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: "Unauthorized" },
                500: { description: "Server error" },
            },
        },

        put: {
            tags: ["Auth"],
            summary: "Update user profile",
            description: "Update the profile information of the authenticated user.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: false,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "John Updated" },
                                email: { type: "string", example: "updated@example.com" },
                                phone: { type: "string", example: "+233509876543" },
                                photoUrl: { type: "string", example: "https://example.com/updated.jpg" },
                                address: { type: "string", example: "Kumasi, Ghana" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Profile updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    updatedUser: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string" },
                                            phone: { type: "string" },
                                            photoUrl: { type: "string" },
                                            address: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                500: { description: "Server error" },
            },
        },

        delete: {
            tags: ["Auth"],
            summary: "Delete user profile",
            description: "Permanently delete the authenticated user's account.",
            security: [{ bearerAuth: [] }],
            responses: {
                204: {
                    description: "User deleted successfully",
                },
                401: { description: "Unauthorized" },
                500: { description: "Server error" },
            },
        },
    },
};


export default profileDocs