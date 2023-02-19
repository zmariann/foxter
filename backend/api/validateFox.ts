import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

// Define a schema for validation
const PostFoxSchema = z.object({
    content: z.string(),
  });

// Middleware function
const validateFox = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Attempt to validate the request body against the schema
    const validated = await PostFoxSchema.safeParse(req.body);

    // Save the validated body to the request object
    req.body = validated;

    //   // Return an error if the content is missing
    //   if (validated.success === false) {
    //     return res.status(400).send({ error: validated.error.flatten() });
    //   }

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    // If validation fails, send a 401 response with the validation errors
    res.status(401).send(error.flatten());
  }
};

export { validateFox }