// src/modules/property/property.service.ts
import prisma from "../prisma.js";
import { Prisma } from "@prisma/client";


export async function createProperty(managerId: string, data: any) {
        const createData: Prisma.PropertyCreateInput = {
            title: data.title,
            description: data.description?? undefined,
            address: data.address,
            amenities: data.amenities ?? null,
            status: data.status ?? "ACTIVE",
            manager: {
                connect: {
                    id: managerId, // Links the new property to the existing manager user
                },
            },
            // create units if provided
            units: data.units
                ? {
                    create: data.units.map((u: any) => ({
                        unitNumber: u.unitNumber,
                        name: u.name,
                        sizeSqm: u.sizeSqm,
                        rentAmount: u.rentAmount ?? undefined,
                        depositAmount: u.depositAmount ?? undefined,
                        currency: u.currency ?? undefined,
                        availability: u.availability ?? undefined,
                        images: u.images ? u.images : undefined,
                        metadata: u.metadata ?? undefined,
                    })),
                }
                : { create: [] },
        };

        return prisma.property.create({ data: createData });
    }

export async function getAllProperties() {
        return prisma.property.findMany({ include: { units: true, manager: true } });
}
    
export async function getPropertyById(id: string) {
        return prisma.property.findUnique({ where: { id }, include: { units: true, manager: true } });
}
    
export async function updateProperty(id: string, data: any) {
        // prevent changing managerId here (unless separate endpoint)
        const updateData: Prisma.PropertyUpdateInput = {
            title: data.title,
            description: data.description ?? undefined,
            address: data.address ?? undefined,
            amenities: data.amenities ?? undefined,
            status: data.status ?? undefined,
        };
        return prisma.property.update({ where: { id }, data: updateData });
    }

export async function deleteProperty(id: string) {
        return prisma.property.delete({ where: { id } });
    }



