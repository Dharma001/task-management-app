// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController));

export default router;
