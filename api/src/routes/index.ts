import { Router, Request, Response } from 'express';
import userRoutes from './user-routes';
import userAuthRoutes from './user-auth-routes';
import taskRoutes from './task-routes';
import { verifyToken } from '../middleware/verify-token';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running!');
});

router.use('/api/v1', verifyToken, userRoutes , taskRoutes);
router.use('/api/auth', userAuthRoutes);

export default router;
