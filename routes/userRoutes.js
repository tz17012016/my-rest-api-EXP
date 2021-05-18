import express from 'express';
const router = express.Router();
import {
  authUser,
  getMyCards,
  updateMyCards,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { authToken, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser).get(authToken, getUsers);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(authToken, getUserProfile)
  .put(authToken, updateUserProfile);
router
  .route('/cards')
  .get(authToken, getMyCards)
  .patch(authToken, updateMyCards);
router
  .route('/:id')
  .get(authToken, getUserById)
  .patch(authToken, admin, updateUser)
  .delete(authToken, admin, deleteUser);

export default router;
