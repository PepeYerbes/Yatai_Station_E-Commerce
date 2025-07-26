import express from 'express';
import { registrer, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registrer);
router.post('/login', login);

export default router;

