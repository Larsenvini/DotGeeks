import { Request } from 'express';
import { Document } from 'mongoose';
import { IUser } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: string };
    }
  }
}

export {};