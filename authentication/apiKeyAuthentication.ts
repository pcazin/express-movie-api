import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY;

export function apiKeyAuthentication(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
}
