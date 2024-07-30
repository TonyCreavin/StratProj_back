import { signup, signin } from '../controllers/authController.js';
import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
const router = express.Router();
router.post('/register', signup);
router.post('/login', signin);

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)
  .put(updateUser);

export default router;
