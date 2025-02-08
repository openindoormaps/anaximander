// Project: Open Indoor Maps
// File: src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};