import React, { useState } from 'react';
import { Loader2, DollarSign, Flame, Utensils } from 'lucide-react';

const MealPlannerForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    budget: '',
    calories: '',
    diet: 'omnivore'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      budget: Number(formData.budget),
      calories: Number(formData.calories),
      diet: formData.diet
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-lg font-bold text-brand-dark">
          <DollarSign size={20} className="text-brand-primary" /> Daily Budget
        </label>
        <input
          type="number"
          name="budget"
          min="1"
          required
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-4 border-brand-dark bg-[#FFF8F8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/20 transition-all font-medium text-lg placeholder:text-brand-dark/40"
          placeholder="e.g., 20"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-lg font-bold text-brand-dark">
          <Flame size={20} className="text-brand-cta" /> Target Calories
        </label>
        <input
          type="number"
          name="calories"
          min="500"
          max="10000"
          required
          value={formData.calories}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-4 border-brand-dark bg-[#FFF8F8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-cta/20 transition-all font-medium text-lg placeholder:text-brand-dark/40"
          placeholder="e.g., 2000"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-lg font-bold text-brand-dark">
          <Utensils size={20} className="text-brand-secondary" /> Dietary Preference
        </label>
        <div className="relative">
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-4 border-brand-dark bg-[#FFF8F8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-secondary/20 transition-all font-medium text-lg appearance-none cursor-pointer"
          >
            <option value="omnivore">Omnivore (No restrictions)</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-brand-dark">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-8 bg-brand-cta hover:bg-brand-primary text-brand-dark hover:text-white font-bold text-xl py-4 rounded-xl border-4 border-brand-dark shadow-block hover:shadow-block-hover hover:translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-block"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            Cooking up plan...
          </>
        ) : (
          'Generate Meal Plan!'
        )}
      </button>
    </form>
  );
};

export default MealPlannerForm;
