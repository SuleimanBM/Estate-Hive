// src/modules/property/property.controller.ts
import { NextFunction, Request, Response } from "express";
import { createProperty, updateProperty, getAllProperties, getPropertyById, deleteProperty, generatePresignedUrl } from "../services/properties.services.js";


export async function getPresignedUrlHandler(req: Request, res: Response) {
    try {
        const { fileType } = req.body; // e.g. "image/png"
        console.log(fileType);

        if (!fileType) {
            return res.status(400).json({ error: "fileType is required" });
        }

        const { url, fileKey } = await generatePresignedUrl(fileType);

        return res.json({ uploadUrl: url, fileKey });
    } catch (error: any) {
        console.error("Error generating presigned URL:", error);
        return res.status(500).json({ error: "Failed to generate upload URL" });
    }
}

export async function createPropertyHandler(req: Request, res: Response) {
    const ownerId = req.user?.id; // from auth middleware 
    console.log("OwnerId ", ownerId)
    const property = await createProperty(ownerId!, req.body);
    return res.status(201).json(property);
}

export async function getPropertiesHandler(req: Request, res: Response) {
    const result = await getAllProperties(req.query);
    return res.json({success: true, ...result});
}

export async function getPropertyHandler(req: Request, res: Response) {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
}

export async function updatePropertyHandler(req: Request, res: Response) {
    const updated = await updateProperty(req.params.id, req.body);
    res.json(updated);
}

export async function deletePropertyHandler(req: Request, res: Response) {
    await deleteProperty(req.params.id);
    res.status(204).send();
}


// export async function create(req: Request, res: Response) {
//         try {
//             const managerId = req.user?.id ?? null; // allow null for superadmin creating for others
//             const property = await createProperty(managerId, req.body);
//             return res.status(201).json({ success: true, data: property });
//         } catch (err: any) {
//             return res.status(400).json({ success: false, error: err.message });
//         }
//     }

// export async function getAll(req: Request, res: Response) {
//         const items = await getAllProperties();
//         return res.json({ success: true, data: items });
//     }

// export async function getById(req: Request, res: Response) {
//         const item = await getPropertyById(req.params.id);
//         if (!item) return res.status(404).json({ success: false, error: "Not found" });
//         return res.json({ success: true, data: item });
//     }

// export async function update(req: Request, res: Response) {
//         try {
//             const updated = await updateProperty(req.params.id, req.body);
//             return res.json({ success: true, data: updated });
//         } catch (err: any) {
//             return res.status(400).json({ success: false, error: err.message });
//         }
//     }

// export async function remove(req: Request, res: Response, next: NextFunction) {
//         try {
//             await deleteProperty(req.params.id);
//             return res.status(204).send();
//         } catch (err: any) {
//             return res.status(400).json({ success: false, error: err.message });
//         }
//     }


