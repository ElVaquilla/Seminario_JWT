import { Request, Response, NextFunction } from 'express';

export const AdminValidation = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
