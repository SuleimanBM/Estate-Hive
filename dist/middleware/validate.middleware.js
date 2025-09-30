export const validate = (schema) => (req, res, next) => {
    try {
        // allow schema to validate body/params/query depending on the schema shape
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    }
    catch (err) {
        return res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
    }
};
//# sourceMappingURL=validate.middleware.js.map