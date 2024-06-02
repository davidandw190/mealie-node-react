import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateUpdateUserRequest = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('addressLine1').isString().notEmpty().withMessage('addressLine1 is required'),
  body('city').isString().notEmpty().withMessage('city is required'),
  body('country').isString().notEmpty().withMessage('country is required'),
  handleValidationErrors
];