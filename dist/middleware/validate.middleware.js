import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
};
export const validateBody = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        return next();
    }
    catch (err) {
        return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
    }
};
export const validateQuery = (schema) => (req, res, next) => {
    try {
        schema.parse(req.query);
        return next();
    }
    catch (err) {
        return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
    }
};
export const validateParams = (schema) => (req, res, next) => {
    try {
        schema.parse(req.params);
        return next();
    }
    catch (err) {
        return res.status(400).json({ error: 'Validation failed', details: err.errors || err.message });
    }
};
//# sourceMappingURL=validate.middleware.js.map