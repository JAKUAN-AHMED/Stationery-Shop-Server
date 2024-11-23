import { Response, Request, NextFunction } from 'express';
import { z } from 'zod';

export const ValidateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
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
