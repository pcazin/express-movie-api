import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const API_KEY = process.env.API_KEY;

export function apiKeyAuthentication(req: Request, res: Response, next: NextFunction) {

  const ReqApiKey = req.headers['x-api-key'];

  if (!ReqApiKey || ReqApiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
}
