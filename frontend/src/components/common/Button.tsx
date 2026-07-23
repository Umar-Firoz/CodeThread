import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 outline-none select-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-700/30 shadow-[0_1px_2px_rgba(59,130,246,0.3)] focus:ring-2 focus:ring-blue-500/40',
    secondary: 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-100 border border-zinc-800 focus:ring-2 focus:ring-zinc-700/40',
    outline: 'bg-transparent border border-zinc-800 text-zinc-300 hover:bg-zinc-900/50 hover:text-zinc-100 focus:ring-2 focus:ring-zinc-800/60',
    ghost: 'bg-transparent text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200 focus:ring-2 focus:ring-zinc-900',
    danger: 'bg-red-950/30 text-red-400 border border-red-900/40 hover:bg-red-900/30 hover:text-red-200 focus:ring-2 focus:ring-red-900/40',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
