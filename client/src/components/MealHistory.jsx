import React from 'react';
import { History, ArrowRight } from 'lucide-react';

const MealHistory = ({ history, onSelectPlan }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12 px-6 border-4 border-dashed border-brand-dark/20 rounded-xl">
        <History size={48} className="mx-auto text-brand-dark/20 mb-4" />
        <p className="text-xl font-bold text-brand-dark/40">No past plans</p>
        <p className="text-sm font-medium text-brand-dark/30 mt-2">Your history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
      {history.map((plan) => (
        <button
          key={plan._id}
          onClick={() => onSelectPlan(plan)}
          className="w-full text-left p-5 rounded-xl border-4 border-brand-dark bg-white hover:bg-brand-cta shadow-[2px_2px_0px_0px_rgba(69,10,10,1)] hover:shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] transition-all group hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-black text-2xl text-brand-dark">
              {plan.calories} <span className="text-sm font-bold opacity-70">kcal</span>
            </span>
            <span className="text-xs font-black px-3 py-1.5 bg-brand-primary text-white border-2 border-brand-dark rounded-full uppercase tracking-wider">
              {plan.diet}
            </span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-sm font-bold text-brand-dark/60 uppercase tracking-wide">
                Budget
              </div>
              <div className="text-xl font-bold text-brand-dark">
                ${plan.budget}
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-xs font-bold text-brand-dark/50 mb-1">
                {new Date(plan.createdAt).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric'
                })}
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MealHistory;
