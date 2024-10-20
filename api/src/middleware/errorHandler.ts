import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err instanceof Error ? err.stack : err);
    res.status(500).json({ message: 'Internal Server Error' });
};
