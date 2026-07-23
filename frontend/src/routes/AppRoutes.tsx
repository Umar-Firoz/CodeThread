import React, { useState } from 'react';
import { useAuth } from '../store/authStore';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';

export default function AppRoutes() {
  const { isAuthenticated, logout, user } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  if (currentView === 'register') {
    return <RegisterPage onToggleView={() => setCurrentView('login')} />;
  }

  return <LoginPage onToggleView={() => setCurrentView('register')} />;
}
