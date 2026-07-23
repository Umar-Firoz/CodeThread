import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
}

export function Card({ children, className = '', hoverGlow = false, ...props }: CardProps) {
  return (
    <div
      className={`bg-zinc-950/45 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        hoverGlow
          ? 'hover:border-zinc-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-blue-900/5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 pb-3 border-b border-zinc-900/60 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-base font-semibold text-zinc-100 tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs text-zinc-500 mt-1 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 pt-3 border-t border-zinc-900/60 bg-zinc-950/10 ${className}`} {...props}>
      {children}
    </div>
  );
}
