import express from 'express';
const router = express.Router();
import {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateStatus
} from '../controller/taskController.js';



// POST a new task
router.post('/create', createTask);

// GET all tasks
router.get('/getAllTasks', getAllTasks);

// GET a single task
router.get('/:id', getTaskById);

// PUT update a task
router.put('/:id', updateTask);

//Update Status
router.put('/tasks/:id/status', updateStatus);

// DELETE a task
router.delete('/:id', deleteTask);

export default router;
