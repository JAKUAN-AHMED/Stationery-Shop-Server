"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]+)"/);
    const errorSources = [
        {
            path: '',
            message: `${match[1]} is Already Exists`,
        },
    ];
    const statusCode = 409;
    return {
        statusCode,
        message: 'DuplicateError',
        errorSources,
    };
};
exports.default = handleDuplicateError;
