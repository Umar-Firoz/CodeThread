import React from 'react';
import Login from '../features/auth/Login';

interface LoginPageProps {
  onToggleView: () => void;
}

export default function LoginPage({ onToggleView }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden font-sans select-none">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Subtle radial center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Form Area */}
      <div className="relative z-10 w-full flex justify-center">
        <Login onToggleView={onToggleView} />
      </div>
    </div>
  );
}
