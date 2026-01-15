import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { CombineProvider } from '@/app/providers';
import { cn } from '@/shared/lib/classnames';
import { AppHeader } from '@/widgets/header/ui';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '수강 신청',
  description: '수강 신청 프론트엔드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CombineProvider>
          <div
            className={cn(
              'min-h-screen overflow-x-clip font-sans',
              'bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50',
            )}
          >
            <div className="sticky inset-x-0 top-0 z-50 h-[84px] bg-zinc-50/90 backdrop-blur dark:bg-black/70">
              <div className="flex h-full w-full items-center px-4 sm:px-6">
                <AppHeader />
              </div>
            </div>
            <main className="w-full px-4 py-6 sm:px-6 sm:py-8">{children}</main>
          </div>
        </CombineProvider>
      </body>
    </html>
  );
}
