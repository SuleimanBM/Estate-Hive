import { z } from "zod";
export declare const addressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    region: z.ZodString;
    country: z.ZodString;
    lat: z.ZodOptional<z.ZodNumber>;
    lon: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    city?: string;
    street?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
}, {
    city?: string;
    street?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
}>;
export declare const unitInputSchema: z.ZodObject<{
    unitNumber: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    sizeSqm: z.ZodOptional<z.ZodNumber>;
    rentAmount: z.ZodOptional<z.ZodNumber>;
    depositAmount: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    availability: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    unitNumber?: string;
    sizeSqm?: number;
    rentAmount?: number;
    depositAmount?: number;
    currency?: string;
    availability?: string;
    images?: string[];
    metadata?: any;
}, {
    name?: string;
    unitNumber?: string;
    sizeSqm?: number;
    rentAmount?: number;
    depositAmount?: number;
    currency?: string;
    availability?: string;
    images?: string[];
    metadata?: any;
}>;
export declare const createPropertySchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        address: z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            region: z.ZodString;
            country: z.ZodString;
            lat: z.ZodOptional<z.ZodNumber>;
            lon: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        }, {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        }>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodOptional<z.ZodString>;
        units: z.ZodOptional<z.ZodArray<z.ZodObject<{
            unitNumber: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            sizeSqm: z.ZodOptional<z.ZodNumber>;
            rentAmount: z.ZodOptional<z.ZodNumber>;
            depositAmount: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodOptional<z.ZodString>;
            availability: z.ZodOptional<z.ZodString>;
            images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            metadata: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }, {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
        units?: {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }[];
    }, {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
        units?: {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
        units?: {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }[];
    };
}, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
        units?: {
            name?: string;
            unitNumber?: string;
            sizeSqm?: number;
            rentAmount?: number;
            depositAmount?: number;
            currency?: string;
            availability?: string;
            images?: string[];
            metadata?: any;
        }[];
    };
}>;
export declare const updatePropertySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            region: z.ZodString;
            country: z.ZodString;
            lat: z.ZodOptional<z.ZodNumber>;
            lon: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        }, {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        }>>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    }, {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    };
    params?: {
        id?: string;
    };
}, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        address?: {
            city?: string;
            street?: string;
            region?: string;
            country?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    };
    params?: {
        id?: string;
    };
}>;
export declare const propertyIdParam: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params?: {
        id?: string;
    };
}, {
    params?: {
        id?: string;
    };
}>;
//# sourceMappingURL=property.validator.d.ts.map