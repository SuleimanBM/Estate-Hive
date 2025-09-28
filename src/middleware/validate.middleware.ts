import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ZodSchema } from 'zod';

// export const validate = (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             success: false,
//             message: "Validation failed",
//             errors: errors.array()
//         });
//     }
//     next();
// };




// export const validateBody = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
//     try {
//         schema.parse(req.body);
//         return next();
//     } catch (err: any) {
//         return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
//     }
// };


// export const validateQuery = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
//     try {
//         schema.parse(req.query);
//         return next();
//     } catch (err: any) {
//         return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
//     }
// };


// export const validateParams = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
//     try {
//         schema.parse(req.params);
//         return next();
//     } catch (err: any) {
//         return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
//     }
// };
// src/middleware/validate.ts

import { AnyZodObject } from "zod";

export const validate =
    (schema: AnyZodObject) =>
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
