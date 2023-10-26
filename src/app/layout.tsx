import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from 'src/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
