import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import mongoose from 'mongoose';

// Extend the Express Request interface to include the user
declare global {
    namespace Express {
        interface Request {
            user?: IUser & { _id: string };
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string, role: string };
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Convert Mongoose document to a plain object and ensure _id is a string
        

        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const authorize = (roles: IUser['role'][]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};