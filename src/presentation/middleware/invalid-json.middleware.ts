import { NextFunction, Request, Response } from "express";

export const invalidJsonMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if( err instanceof SyntaxError ) return res.status(400).json({ error: 'Invalid JSON' });
  next(err);
}