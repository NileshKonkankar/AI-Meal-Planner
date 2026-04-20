import MealPlan from '../models/MealPlan.js';
import { generateMealPlan } from '../services/aiService.js';

export const createMealPlan = async (req, res, next) => {
  try {
    const { budget, calories, diet } = req.body;
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID header (x-user-id) is required' });
    }
    if (!budget || !calories || !diet) {
      return res.status(400).json({ error: 'Budget, calories, and diet are required' });
    }

    // Generate via AI
    const aiResponse = await generateMealPlan(budget, calories, diet);

    // Save to DB
    const newMealPlan = new MealPlan({
      userId,
      budget,
      calories,
      diet,
      meals: aiResponse.meals,
      grocery_list: aiResponse.grocery_list,
      nutrition: aiResponse.nutrition
    });

    await newMealPlan.save();

    res.status(201).json(newMealPlan);
  } catch (error) {
    next(error);
  }
};

export const getMealHistory = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID header (x-user-id) is required' });
    }

    const history = await MealPlan.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};
