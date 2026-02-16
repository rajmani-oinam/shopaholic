import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';
import { GoalProvider } from '@/contexts/GoalContext';

const rubik = Rubik({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Do It',
  description: 'A simple goal-tracking dashboard to set, complete, and manage your goals.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-pastel-bg text-pastel-text min-h-screen`}>
        <GoalProvider>{children}</GoalProvider>
      </body>
    </html>
  );
}