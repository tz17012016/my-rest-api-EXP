import express from 'express';
const router = express.Router();

import {
  getAllCards,
  getCardById,
  craeteCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController.js';
import { authToken } from '../middleware/authMiddleware.js';

router.route('/').get(getAllCards).post(authToken, craeteCard);

router
  .route('/:id')
  .get(getCardById)
  .put(authToken, updateCard)
  .delete(authToken, deleteCard);

export default router;
