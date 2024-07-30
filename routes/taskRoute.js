import express from 'express';

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/taskController.js';

const router = express.Router();
router.route('/').get(getAllTasks).post(createTask);
router
  .route('/:id')
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(updateTask);

export default router;
