import type { NextFunction, Request, Response } from "express";

import { AppError } from "./AppError";

export const handleError = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // TODO: log errors to files
  console.error(_err);

  if (_err instanceof AppError) {
    return res.status(_err.httpCode).json({ name: _err.name, message: _err.message });
  }
  return res.status(500).json({ message: "internal error" });
};
