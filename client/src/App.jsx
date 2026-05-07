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
    <div className="min-h-screen pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-[30rem] h-[30rem] bg-brand-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <header className="pt-20 pb-16 px-6 mb-12 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-bold px-5 py-2 rounded-full mb-6 border border-brand-primary/20 shadow-sm backdrop-blur-sm">
              <Sparkles size={18} />
              <span>AI-Powered Nutrition</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-extrabold leading-tight mb-6 text-brand-dark tracking-tight">
              Plan your meals in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">seconds.</span>
            </h1>
            <p className="text-xl text-brand-dark/70 max-w-xl font-medium leading-relaxed">
              Tell us your budget, calories, and diet. We'll handle the grocery list and macro math so you can focus on eating well.
            </p>
          </div>
          <div className="hidden md:flex w-56 h-56 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full shadow-glass items-center justify-center relative">
            <div className="absolute inset-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/50"></div>
            <UtensilsCrossed size={80} className="text-white relative z-10 drop-shadow-md" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Form & Current Result */}
        <div className="flex-1 space-y-10">
          
          <section className="glass-panel p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-bl-full -z-10"></div>
            <h2 className="text-3xl font-serif font-extrabold mb-8 text-brand-dark tracking-tight">Create New Plan</h2>
            <MealPlannerForm onSubmit={handleGenerate} loading={loading} />
          </section>

          {error && (
            <div className="p-5 bg-red-50/80 text-red-600 font-semibold rounded-2xl border border-red-100 shadow-sm flex items-center gap-3 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </div>
          )}

          {currentPlan && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out pt-4">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-serif font-extrabold text-brand-dark tracking-tight">
                  Your Custom Plan
                </h2>
                <div className="h-px bg-gradient-to-r from-brand-primary/30 to-transparent flex-1"></div>
              </div>
              <MealPlanCard plan={currentPlan} />
            </section>
          )}
        </div>

        {/* Right Column: History */}
        <div className="lg:w-[420px] shrink-0">
          <section className="glass-panel p-8 h-full sticky top-8 flex flex-col max-h-[calc(100vh-4rem)]">
            <h2 className="text-2xl font-serif font-extrabold mb-6 text-brand-dark flex items-center gap-3">
              Past Meal Plans
            </h2>
            <MealHistory history={history} onSelectPlan={setCurrentPlan} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
