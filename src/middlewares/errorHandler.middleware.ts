import { NextFunction, Request, Response } from 'express';
import { isHttpError, HttpError } from 'http-errors';

export default async (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<Response> => {
  const statusCode = isHttpError(err) ? err.statusCode : 500;

  return res.status(statusCode).json({ message: err.message });
};