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
    breakfast: 'from-amber-50 to-orange-50 border-orange-100 text-orange-600',
    lunch: 'from-emerald-50 to-teal-50 border-teal-100 text-teal-600',
    dinner: 'from-blue-50 to-indigo-50 border-blue-100 text-blue-600'
  };

  return (
    <div className="space-y-8">
      {/* Meals Section */}
      <div className="flex flex-col gap-6">
        {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
          <div key={mealTime} className={`bg-gradient-to-br ${mealColors[mealTime]} p-6 rounded-3xl border shadow-sm transform transition-transform hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/60 rounded-2xl backdrop-blur-sm shadow-sm border border-white">
                {mealIcons[mealTime]}
              </div>
              <h3 className="capitalize font-serif font-extrabold text-2xl text-brand-dark">{mealTime}</h3>
            </div>
            <p className="text-brand-dark/80 text-lg leading-relaxed font-medium pl-2 border-l-2 border-current/20">{meals[mealTime]}</p>
          </div>
        ))}
      </div>

      {/* Grocery & Nutrition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Grocery List */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20 w-max">
            <ShoppingBag size={20} className="text-brand-primary" />
            <h3 className="font-serif font-bold text-lg text-brand-primary">Grocery List</h3>
          </div>
          <ul className="space-y-4">
            {grocery_list.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-brand-dark/80 font-medium group cursor-default">
                <div className="p-1 rounded-md bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <CheckSquare size={16} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Info */}
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 md:p-8 rounded-3xl shadow-soft flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-tr-full pointer-events-none"></div>
          
          <h3 className="font-serif font-extrabold text-3xl mb-8 text-center relative z-10">Daily Macros</h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="text-center p-5 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
              <div className="text-4xl font-black drop-shadow-sm">{nutrition.calories}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90 mt-2">Calories</div>
            </div>
            <div className="text-center p-5 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
              <div className="text-4xl font-black drop-shadow-sm">{nutrition.protein}g</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90 mt-2">Protein</div>
            </div>
            <div className="text-center p-5 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
              <div className="text-4xl font-black drop-shadow-sm">{nutrition.carbs}g</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90 mt-2">Carbs</div>
            </div>
            <div className="text-center p-5 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
              <div className="text-4xl font-black drop-shadow-sm">{nutrition.fats}g</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90 mt-2">Fats</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
