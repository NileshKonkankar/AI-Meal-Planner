import React, { useState, useEffect } from 'react';
import MealPlannerForm from './components/MealPlannerForm';
import MealPlanCard from './components/MealPlanCard';
import MealHistory from './components/MealHistory';
import { generateMealPlan, getMealHistory } from './services/api';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

function App() {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const data = await getMealHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateMealPlan(formData);
      setCurrentPlan(result);
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <header className="bg-brand-primary text-white py-16 px-6 border-b-4 border-brand-dark mb-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-cta text-brand-dark font-bold px-4 py-1.5 rounded-full border-2 border-brand-dark mb-6 transform -rotate-2">
              <Sparkles size={18} />
              <span>AI-Powered Nutrition</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-white drop-shadow-md">
              Plan your meals in <span className="text-brand-cta underline decoration-4 underline-offset-4">seconds.</span>
            </h1>
            <p className="text-xl opacity-90 max-w-xl font-medium">
              Tell us your budget, calories, and diet. We'll handle the grocery list and macro math.
            </p>
          </div>
          <div className="hidden md:flex w-48 h-48 bg-brand-secondary rounded-full border-4 border-brand-dark shadow-block items-center justify-center rotate-3 hover:rotate-6 transition-transform">
            <UtensilsCrossed size={80} className="text-brand-dark" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form & Current Result */}
        <div className="flex-1 space-y-12">
          
          <section className="bg-white p-8 rounded-2xl border-4 border-brand-dark shadow-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-cta border-2 border-brand-dark rounded-full"></div>
            <h2 className="text-3xl font-serif font-bold mb-6 text-brand-dark">Create New Plan</h2>
            <MealPlannerForm onSubmit={handleGenerate} loading={loading} />
          </section>

          {error && (
            <div className="p-4 bg-red-100 text-brand-primary font-bold rounded-xl border-4 border-brand-primary shadow-block">
              {error}
            </div>
          )}

          {currentPlan && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-4xl font-serif font-bold mb-8 text-brand-dark inline-block relative">
                Your Custom Plan
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-brand-cta -z-10 transform -rotate-1"></div>
              </h2>
              <MealPlanCard plan={currentPlan} />
            </section>
          )}
        </div>

        {/* Right Column: History */}
        <div className="lg:w-[400px] shrink-0">
          <section className="bg-[#FFF8F8] p-8 rounded-2xl border-4 border-brand-dark shadow-block h-full sticky top-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-brand-dark border-b-2 border-brand-dark/10 pb-4">Past Meal Plans</h2>
            <MealHistory history={history} onSelectPlan={setCurrentPlan} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
