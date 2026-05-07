import React from 'react';
import { History, ArrowRight } from 'lucide-react';

const MealHistory = ({ history, onSelectPlan }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-16 px-6 border-2 border-dashed border-brand-primary/20 rounded-3xl bg-brand-primary/5">
        <History size={48} className="mx-auto text-brand-primary/30 mb-4" />
        <p className="text-xl font-bold text-brand-dark/50">No past plans</p>
        <p className="text-sm font-medium text-brand-dark/40 mt-2">Your history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
      {history.map((plan) => (
        <button
          key={plan._id}
          onClick={() => onSelectPlan(plan)}
          className="w-full text-left p-5 rounded-2xl border border-brand-primary/10 bg-white hover:bg-gradient-to-r hover:from-white hover:to-brand-primary/5 shadow-sm hover:shadow-soft transition-all group hover:-translate-y-0.5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-2xl text-brand-dark flex items-baseline gap-1">
              {plan.calories} <span className="text-sm font-bold opacity-60">kcal</span>
            </span>
            <span className="text-xs font-bold px-3 py-1 bg-brand-secondary/20 text-brand-dark rounded-full uppercase tracking-wider">
              {plan.diet}
            </span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-1">
                Budget
              </div>
              <div className="text-xl font-extrabold text-brand-primary">
                ${plan.budget}
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-xs font-medium text-brand-dark/50 mb-2">
                {new Date(plan.createdAt).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric'
                })}
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
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
