import { Router } from 'express';
import { TaskController } from '../controllers/task-controller';

const router = Router();
const taskController = new TaskController();

router.get('/tasks', taskController.getAllTasks.bind(taskController)); 
router.get('/tasks/:id', taskController.getTaskById.bind(taskController));
router.post('/tasks', taskController.createTask.bind(taskController));
router.put('/tasks/:id', taskController.updateTask.bind(taskController)); 
router.patch('/tasks/status/:id', taskController.updateTaskStatus.bind(taskController));
router.patch('/tasks/priority/:id', taskController.updateTaskPriority.bind(taskController));
router.delete('/tasks/:id', taskController.deleteTask.bind(taskController)); 

export default router;
