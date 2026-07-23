import React from 'react';

interface BadgeProps {
  variant?: 'active' | 'archived' | 'neutral' | 'blue';
  children: React.ReactNode;
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  const styles = {
    active: 'bg-emerald-950/30 text-emerald-400 border-emerald-900/40 shadow-[0_0_8px_rgba(16,185,129,0.1)]',
    archived: 'bg-zinc-900 text-zinc-500 border-zinc-800',
    neutral: 'bg-zinc-900/80 text-zinc-300 border-zinc-800/80',
    blue: 'bg-blue-950/30 text-blue-400 border-blue-900/40 shadow-[0_0_8px_rgba(59,130,246,0.1)]',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-200 select-none ${styles[variant]}`}
    >
      {variant === 'active' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
      )}
      {children}
    </span>
  );
}
