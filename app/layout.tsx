
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Becoming You Labs - Kanban Board',
  description: 'Take-home assessment – Kanban board',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-serif text-2xl">Becoming You Labs</div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
