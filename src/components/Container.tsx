import React, { ReactNode } from 'react';

interface containerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: containerProps) {
  return (
    <div
      className={`max-w-[100rem] border border-transparent mx-auto mt-25 p-2 ${className}`}
    >
      {children}
    </div>
  );
}
