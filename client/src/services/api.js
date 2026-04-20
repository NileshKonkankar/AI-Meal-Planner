import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simple UUID generator for local storage based user tracking
const getUserId = () => {
  let userId = localStorage.getItem('mealPlannerUserId');
  if (!userId) {
    userId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    localStorage.setItem('mealPlannerUserId', userId);
  }
  return userId;
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers['x-user-id'] = getUserId();
  return config;
});

export const generateMealPlan = async (data) => {
  const response = await api.post('/meals/generate', data);
  return response.data;
};

export const getMealHistory = async () => {
  const response = await api.get('/meals/history');
  return response.data;
};
