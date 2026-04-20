import React from 'react';
import { CheckSquare, ShoppingBag, Coffee, Sun, Moon } from 'lucide-react';

const MealPlanCard = ({ plan }) => {
  if (!plan) return null;

  const { meals, grocery_list, nutrition } = plan;

  const mealIcons = {
    breakfast: <Coffee size={24} />,
    lunch: <Sun size={24} />,
    dinner: <Moon size={24} />
  };

  const mealColors = {
    breakfast: 'bg-[#FFF3CD]',
    lunch: 'bg-[#D1E7DD]',
    dinner: 'bg-[#CFF4FC]'
  };

  return (
    <div className="space-y-8">
      {/* Meals Section */}
      <div className="flex flex-col gap-6">
        {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
          <div key={mealTime} className={`${mealColors[mealTime]} p-6 rounded-2xl border-4 border-brand-dark shadow-block transform transition-transform hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-3 border-b-2 border-brand-dark/10 pb-3">
              <div className="p-2 bg-white rounded-lg border-2 border-brand-dark">
                {mealIcons[mealTime]}
              </div>
              <h3 className="capitalize font-serif font-bold text-2xl text-brand-dark">{mealTime}</h3>
            </div>
            <p className="text-brand-dark text-lg leading-relaxed font-medium">{meals[mealTime]}</p>
          </div>
        ))}
      </div>

      {/* Grocery & Nutrition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Grocery List */}
        <div className="bg-[#E2E3E5] p-6 rounded-2xl border-4 border-brand-dark shadow-block">
          <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl border-2 border-brand-dark w-max">
            <ShoppingBag size={24} className="text-brand-primary" />
            <h3 className="font-serif font-bold text-xl text-brand-dark">Grocery List</h3>
          </div>
          <ul className="space-y-3">
            {grocery_list.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-lg font-medium text-brand-dark bg-white p-3 rounded-xl border-2 border-brand-dark/20">
                <CheckSquare size={20} className="text-brand-cta mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Info */}
        <div className="bg-brand-primary p-6 rounded-2xl border-4 border-brand-dark shadow-block flex flex-col justify-center text-white">
          <h3 className="font-serif font-bold text-3xl mb-6 text-center drop-shadow-sm">Daily Macros</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/10 rounded-xl border-2 border-white/20 backdrop-blur-sm">
              <div className="text-4xl font-black">{nutrition.calories}</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mt-1">Calories</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl border-2 border-white/20 backdrop-blur-sm">
              <div className="text-4xl font-black">{nutrition.protein}g</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mt-1">Protein</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl border-2 border-white/20 backdrop-blur-sm">
              <div className="text-4xl font-black">{nutrition.carbs}g</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mt-1">Carbs</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl border-2 border-white/20 backdrop-blur-sm">
              <div className="text-4xl font-black">{nutrition.fats}g</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mt-1">Fats</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
