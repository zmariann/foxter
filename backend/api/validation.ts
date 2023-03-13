import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

type Schema = z.ZodObject<any>;

const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Attempt to validate the request body against the schema
      const validated = schema.parse(req.body);

      // Save the validated body to the request object
      req.body = validated;
      // Move on to the next middleware or route handler
      next();
    } catch (error) {
      // If validation fails, send an error response with the provided message or the validation errors
       return res.status(400).send(error.flatten());
    }
  };
};

export { validateBody };
