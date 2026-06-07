// components/FloatingLogo.tsx
'use client';

import Image from 'next/image';

export default function FloatingLogo() {
  return (
    <div className="absolute top-0 left-6 mt-5 z-50 hidden md:block w-[clamp(60px,12vw,160px)] h-auto transition-all duration-300">
      <Image
        src="/images/logo/logo2.svg"
        alt="Logo"
        width={160}
        height={160}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );
}