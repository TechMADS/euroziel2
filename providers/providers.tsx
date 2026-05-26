'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider 
      attribute="data-theme" 
      defaultTheme="system" 
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
