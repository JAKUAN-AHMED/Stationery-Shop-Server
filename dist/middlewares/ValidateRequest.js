"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const ValidateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            const validationError = new Error('Validation Failed');
            res.status(400).json({
                message: validationError.message,
                success: false,
                error: {
                    name: 'validatiaon error',
                    errors: error.errors,
                },
                stack: validationError.stack,
            });
        }
    };
};
exports.ValidateRequest = ValidateRequest;
