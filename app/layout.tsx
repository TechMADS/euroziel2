// app/layout.tsx
import type { Metadata } from "next";
import { Libre_Baskerville, Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import { cn } from "@/lib/utils";
import FloatingLogo from "@/components/FloatingLogo";
import FloatingNavbar from "@/components/FloatingNavbar";
import EnquiryModal from "@/components/EnquiryModal";
import ClientLayout from "@/components/ClientLayout";

// ── Only load fonts actually used in globals.css ──────────────
const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville',
});

export const metadata: Metadata = {
  title: "EuroZiel — Your Bridge from India to Germany",
  description: "Personalised guidance for Indian students pursuing higher education in Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full antialiased',
        figtree.variable,
        libreBaskerville.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <style>{`
          html {
            color-scheme: light dark;
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
          <EnquiryModal />
        </Providers>
      </body>
    </html>
  );
}