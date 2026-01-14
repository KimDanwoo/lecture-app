import { CombineProvider } from '@/app/providers';
import { AppHeader } from '@/widgets/header/ui';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
          <div className="min-h-screen overflow-x-clip bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
            <div className="sticky inset-x-0 top-0 z-50 h-[84px] bg-zinc-50/90 backdrop-blur dark:bg-black/70">
              <div className="mx-auto flex h-full w-full max-w-3xl items-center px-4 sm:px-6">
                <AppHeader />
              </div>
            </div>
            <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
          </div>
        </CombineProvider>
      </body>
    </html>
  );
}
