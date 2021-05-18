import express from 'express';
import { upload } from '../controllers/uploadController.js';

const router = express.Router();

router.route('/').post(upload);

export default router;
