import React from 'react';
import { useTheme } from 'next-themes';

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  icon?: string;
  label?: string;
  src?: string;
  alt?: string;
}

export default function ImagePlaceholder({
  width = '100%',
  height = '400px',
  className = '',
  icon = '📷',
  label = 'Image',
  src,
  alt = 'Placeholder',
}: ImagePlaceholderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  // If src is provided and it's a valid image, render it
  if (src) {
    return (
      <div className={`overflow-hidden rounded-2xl ${className}`} style={{ width, height }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Otherwise render placeholder
  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${className}`}
      style={{
        width,
        height,
        background: isDark
          ? 'linear-gradient(135deg, #1f2937 0%, #2d3748 100%)'
          : 'linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(45deg, rgba(15, 76, 143, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
            : 'linear-gradient(45deg, rgba(15, 76, 143, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center gap-3"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            fontSize: '48px',
            opacity: 0.6,
            animation: 'bounce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          {icon}
        </div>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: isDark ? 'rgba(200, 220, 245, 0.6)' : 'rgba(107, 114, 128, 0.6)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
