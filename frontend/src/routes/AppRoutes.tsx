import React, { useState } from 'react';
import { useAuth } from '../store/authStore';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export default function AppRoutes() {
  const { isAuthenticated, logout, user } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans select-none relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Subtle radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Dashboard Card */}
        <div className="relative z-10 w-full max-w-md p-8 bg-[#0a0a0a] border border-neutral-900 rounded-xl text-center space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
          <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] select-none block">
            Code Thread
          </span>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome</h1>
            <p className="text-sm text-neutral-300 font-medium tracking-wide break-all">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full py-2 bg-white text-black hover:bg-neutral-200 font-medium rounded text-sm transition-colors duration-200 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return <RegisterPage onToggleView={() => setCurrentView('login')} />;
  }

  return <LoginPage onToggleView={() => setCurrentView('register')} />;
}
