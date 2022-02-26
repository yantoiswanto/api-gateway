import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized');
    }
    let secretKey = process.env.JWT_SECRET || 'secret';
    const token: any = req.headers.authorization?.split(' ')[1];
    try {
        const credential: string | object = jwt.verify(token, secretKey);
        if (!credential) {
            return res.send("token invalid");
        }
        req.app.locals.credential = credential;
        return next();
    } catch (err: any) {
        return res.status(404).json({
            status: false,
            message: err.message
        })
    }


}