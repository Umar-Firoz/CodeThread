 import React, { useState } from 'react';
import { useAuth } from '../../store/authStore';

interface RegisterProps {
  onToggleView: () => void;
}

export default function Register({ onToggleView }: RegisterProps) {
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    // Client-side validations
    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 8) {
      setValidationError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      await register({ name, email, password });
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="w-full max-w-[400px] px-6 py-8 bg-[#0a0a0a] border border-neutral-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
      {/* CodeThread Logo */}
      <div className="flex justify-center mb-6">
        <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] select-none">
          Code Thread
        </span>
      </div>

      <h1 className="text-2xl font-bold text-center text-white tracking-tight mb-2">
        Create your account
      </h1>
      <p className="text-sm text-neutral-400 text-center mb-8">
        Get started with CodeThread today
      </p>

      {/* Error alert boxes */}
      {(validationError || error) && (
        <div className="mb-5 p-3 bg-red-950/30 border border-red-900/50 rounded-md text-sm text-red-400">
          {validationError || error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (validationError) setValidationError(null);
              clearError();
            }}
            placeholder="John Doe"
            disabled={isLoading}
            className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) setValidationError(null);
              clearError();
            }}
            placeholder="name@example.com"
            disabled={isLoading}
            className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (validationError) setValidationError(null);
              clearError();
            }}
            placeholder="••••••••"
            disabled={isLoading}
            className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (validationError) setValidationError(null);
              clearError();
            }}
            placeholder="••••••••"
            disabled={isLoading}
            className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-2.5 bg-white text-black hover:bg-neutral-200 font-medium rounded text-sm transition-colors duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-neutral-900 pt-6">
        <p className="text-xs text-neutral-400">
          Already have an account?{' '}
          <button
            onClick={onToggleView}
            className="text-white hover:underline focus:outline-none cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
