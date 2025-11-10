import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from "zod";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                // allow schema to validate body/params/query depending on the schema shape
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });
                return next();
            } catch (err: any) {
                return res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
            }
        };
