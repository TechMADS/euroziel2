// components/ClientLayout.tsx
'use client';

import { usePathname, useRouter } from "next/navigation";
import FloatingLogo from "@/components/FloatingLogo";
import FloatingNavbar from "@/components/FloatingNavbar";
import FloatingLoginButton from "@/components/FloatingLoginButton";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthRoute && (
        <>
          <FloatingLogo />
          <FloatingNavbar />
          <FloatingLoginButton
            className="hidden lg:flex"
            onClick={() => router.push('/auth')}
          />
          <FloatingThemeToggle className="hidden lg:flex" />
        </>
      )}
      {children}
    </>
  );
}