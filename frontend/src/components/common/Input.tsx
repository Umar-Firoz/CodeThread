import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `ct-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-zinc-400 select-none tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-zinc-500 flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-zinc-950/60 border ${
            error ? 'border-red-900/60 focus:border-red-500' : 'border-zinc-800 focus:border-blue-500'
          } rounded-lg text-sm text-zinc-200 placeholder-zinc-500 transition-all duration-200 outline-none ${
            icon ? 'pl-9 pr-4' : 'px-3.5'
          } py-2 focus:ring-2 ${
            error ? 'focus:ring-red-950/40' : 'focus:ring-blue-950/40'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[11px] text-red-400 font-medium tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}
