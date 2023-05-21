import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from ".";

function errorMiddleware(
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server Error";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
    path: _req.path,
    method: _req.method,
  });
}

export default errorMiddleware;
