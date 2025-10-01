import { s3Client } from "../utils/s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();


export async function createProperty(managerId: string, data: any) {
    const property = await prisma.property.create({
        data: {
            ...data,
            managerId,
        },
    });
    return property
}

export async function getAllProperties(filters) {
    let {
        title,
        minPrice,
        maxPrice,
        city,
        region,
        country,
        amenities,
        status,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const where: any = {};

    if (title) {
        where.title = { contains: title, mode: "insensitive" }; // LIKE %title%
    }

    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = Number(minPrice);
        if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (city) {
        where.address = { path: ["city"], equals: city };
    }

    if (region) {
        where.address = { path: ["region"], equals: region };
    }

    if (country) {
        where.address = { path: ["country"], equals: country };
    }


    if (amenities && amenities.length > 0) {
        where.amenities = { array_contains: amenities };
    }

    if (status) {
        where.status = status;
    }

    const skip = (page - 1) * limit;

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;
    const properties = await prisma.property.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
        include: { manager: false },
    });
    const total = properties.length;
    return {
        data: properties,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}

export async function getPropertyById(id: string) {
    return await prisma.property.findUnique({
        where: { id },
        include: { manager: false },
    });
}

export async function updateProperty(id: string, data: any) {
    return await prisma.property.update({
        where: { id },
        data,
    });
}

export async function deleteProperty(id: string) {
    return prisma.property.delete({
        where: { id },
    });
}

export async function generatePresignedUrl(fileTypes: string[],folder: string) {
    const results = [];

    for (const fileType of fileTypes) {
        const fileKey = `${folder}/${uuidv4()}.${fileType.split("/")[1]}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileKey,
            ContentType: fileType,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });

        results.push({ uploadUrl: url, fileKey });
    }

    return results;
}

export async function getFileUrl(fileKeys: string | string[]) {
    const keys = Array.isArray(fileKeys) ? fileKeys : [fileKeys];
    const results: string[] = [];

    for (const fileKey of keys) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileKey,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        results.push(url);
    }

    return results;
}


// export async function createProperty(managerId: string, data: any) {
//     const createData: Prisma.PropertyCreateInput = {
//         title: data.title,
//         description: data.description ?? undefined,
//         address: data.address,
//         amenities: data.amenities ?? null,
//         status: data.status ?? "ACTIVE",
//         manager: {
//             connect: {
//                 id: managerId, // Links the new property to the existing manager user
//             },
//         },
//         // create units if provided
//         units: data.units
//             ? {
//                 create: data.units.map((u: any) => ({
//                     unitNumber: u.unitNumber,
//                     name: u.name,
//                     sizeSqm: u.sizeSqm,
//                     rentAmount: u.rentAmount ?? undefined,
//                     depositAmount: u.depositAmount ?? undefined,
//                     currency: u.currency ?? undefined,
//                     availability: u.availability ?? undefined,
//                     images: u.images ? u.images : undefined,
//                     metadata: u.metadata ?? undefined,
//                 })),
//             }
//             : { create: [] },
//     };

//     return prisma.property.create({ data: createData });
// }

// export async function getAllProperties() {
//     return prisma.property.findMany({ include: { units: true, manager: true } });
// }

// export async function getPropertyById(id: string) {
//     return prisma.property.findUnique({ where: { id }, include: { units: true, manager: true } });
// }

// export async function updateProperty(id: string, data: any) {
//     // prevent changing managerId here (unless separate endpoint)
//     const updateData: Prisma.PropertyUpdateInput = {
//         title: data.title,
//         description: data.description ?? undefined,
//         address: data.address ?? undefined,
//         amenities: data.amenities ?? undefined,
//         status: data.status ?? undefined,
//     };
//     return prisma.property.update({ where: { id }, data: updateData });
// }

// export async function deleteProperty(id: string) {
//     return prisma.property.delete({ where: { id } });
// }