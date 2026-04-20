import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  budget: Number,
  calories: Number,
  diet: String,
  meals: {
    breakfast: String,
    lunch: String,
    dinner: String
  },
  grocery_list: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MealPlan', mealPlanSchema);
