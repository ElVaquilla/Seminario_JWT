import { Request, Response, NextFunction } from 'express'
import { handleHttp } from '../utils/error.handle'

export const verifyOwnership = (req: Request, res: Response, next: NextFunction) => {
    const userIdToActOn = req.params.id;
    const currentUserId = req.user?.id;

    if (currentUserId === userIdToActOn || req.user?.isAdmin) {
        return next(); // Permite si es el propietario o un administrador
    }
    return res.status(403).json({ message: 'Access denied. Not your data.' });
};