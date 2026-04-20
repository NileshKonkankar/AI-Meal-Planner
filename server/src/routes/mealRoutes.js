import express from 'express';
import { createMealPlan, getMealHistory } from '../controllers/mealController.js';

const router = express.Router();

router.post('/generate', createMealPlan);
router.get('/history', getMealHistory);

export default router;
