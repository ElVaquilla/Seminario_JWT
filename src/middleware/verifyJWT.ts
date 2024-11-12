import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle';

interface IPayload {
    id: string;
    username: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return handleHttp(res, 'Access denied', 'No token provided');

    try {
        const secret = process.env.SECRET ?? 'tokentest';
        const payload = jwt.verify(token, secret) as IPayload;

        req.user = { id: payload.id, username: payload.username, isAdmin: payload.isAdmin };
        next();
    } catch (error) {
        handleHttp(res, 'Invalid token', error);
    }
};
