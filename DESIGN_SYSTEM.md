# Modern Website Design System & Image Integration Guide

## Overview
Your website has been modernized with:
1. **ImagePlaceholder Component** - Reusable placeholder for all images
2. **Modern CSS Utilities** - Glass morphism, animations, gradients, and professional effects
3. **Enhanced Card Styling** - Professional hover effects and color-coded borders
4. **Responsive Layout** - All sections fit within screen sizes

---

## 1. ImagePlaceholder Component

### Usage
```jsx
import ImagePlaceholder from '@/components/ImagePlaceholder';

// Placeholder (default)
<ImagePlaceholder
  height="400px"
  icon="🎓"
  label="Programme Overview"
/>

// With actual image
<ImagePlaceholder
  src="/images/bachelors-programme.jpg"
  alt="Bachelor's Programme"
  height="400px"
/>
```

### Props
- `width`: String or number (default: '100%')
- `height`: String or number (default: '400px')
- `className`: Additional CSS classes
- `icon`: Emoji icon for placeholder (default: '📷')
- `label`: Text label for placeholder (default: 'Image')
- `src`: Image source URL (optional - if provided, shows actual image)
- `alt`: Alt text for image (default: 'Placeholder')

---

## 2. Modern CSS Classes (in globals.css)

### Animation Classes
```jsx
<div className="animate-slide-in"> // Slides in from bottom
<div className="animate-fade-in">  // Fades in
<div className="animate-scale-in"> // Scales in smoothly
```

### Card Effects
```jsx
<div className="hover-lift">  // Lifts on hover with shadow
<div className="hover-glow">  // Glows on hover
<div className="transition-smooth"> // Smooth transitions
```

### Layout Classes
```jsx
<section className="section-container"> // Full-height responsive section
<div className="responsive-grid"> // Auto-responsive grid
<div className="space-between-sections"> // Section spacing
```

### Text Effects
```jsx
<span className="text-gradient"> // Blue to teal gradient
<span className="text-accent-gradient"> // Gold to coral gradient
```

---

## 3. Image Placeholder Locations to Add

Already updated with placeholders:
- ✅ Services/Bachelors.tsx
- ✅ Services/Masters.tsx
- ✅ Services/Ausbildung.tsx

Recommended for future updates:
- Home/WhyEuroZiel.tsx
- Home/Journey.tsx
- AboutUs/Hero.tsx
- AboutUs/WhatMakesDiff.tsx
- StudyInGermany/Hero.tsx
- FAQ sections

---

## 4. Adding Real Images

### Step 1: Prepare Images
Place images in `/public/images/` with organized structure:
```
public/
├── images/
│   ├── services/
│   │   ├── bachelors.jpg
│   │   ├── masters.jpg
│   │   └── ausbildung.jpg
│   ├── about/
│   │   ├── hero.jpg
│   │   └── team.jpg
│   └── journey/
│       ├── step1.jpg
│       └── step2.jpg
```

### Step 2: Replace Placeholder
```jsx
// Before (placeholder)
<ImagePlaceholder height="400px" icon="🎓" label="Programme Overview" />

// After (real image)
<ImagePlaceholder
  src="/images/services/bachelors.jpg"
  alt="Bachelor's Programme at German Universities"
  height="400px"
/>
```

---

## 5. Modern Card Design Pattern

Already implemented in updated sections:

```jsx
<div className="flex gap-4 items-start p-6 rounded-2xl hover-lift" 
  style={{ 
    background: isDark ? 'rgba(15,76,143,0.08)' : 'rgba(15,76,143,0.06)',
    border: '1px solid rgba(15,76,143,0.15)' 
  }}>
  <Icon color="#0f4c8f" size={28} />
  <div>
    <h3 className="font-serif font-bold text-[18px] mb-1">{title}</h3>
    <p className="text-[15px] leading-relaxed">{description}</p>
  </div>
</div>
```

### Key Features:
- **Rounded corners**: `rounded-2xl` for modern look
- **Hover effect**: `hover-lift` for interactivity
- **Color scheme**: Accent colors with opacity for depth
- **Border**: Subtle colored border matching accent
- **Spacing**: Generous padding (p-6) for breathing room

---

## 6. Responsive Section Template

```jsx
<section className="py-24 px-5 sm:px-8 max-w-6xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left: Text Content */}
    <Reveal delay={100}>
      <div className="space-y-6">
        <span className="badge">SECTION TITLE</span>
        <h2>Main Heading</h2>
        <p>Content goes here</p>
      </div>
    </Reveal>

    {/* Right: Image */}
    <Reveal>
      <ImagePlaceholder src="/image.jpg" height="400px" />
    </Reveal>
    
  </div>
</section>
```

---

## 7. Color Palette (Updated)

- **Primary Blue**: `#0f4c8f`
- **Gold Accent**: `#f59e0b`
- **Teal**: `#0ea5e9`
- **Emerald**: `#16a34a`
- **Coral**: `#fb923c`
- **Violet**: `#7c3aed`

Use with opacity for depth:
- `rgba(15,76,143,0.08)` - Light blue background
- `rgba(15,76,143,0.15)` - Medium border
- `rgba(15,76,143,0.30)` - Strong accent

---

## 8. Recommended Image Sizes

- **Hero sections**: 1920×1080 (16:9 ratio)
- **Card images**: 400×300 (4:3 ratio)
- **Feature images**: 800×600 (4:3 ratio)
- **Testimonial avatars**: 80×80 (1:1 ratio)

Optimize all images:
- Compress with TinyPNG or similar
- Use WebP format for better performance
- Lazy load with `loading="lazy"`

---

## 9. Quick Integration Checklist

For each section needing images:
- [ ] Create image folder in `/public/images/`
- [ ] Add optimized images
- [ ] Import ImagePlaceholder component
- [ ] Replace placeholder with real image src
- [ ] Update alt text for SEO
- [ ] Test responsive layout
- [ ] Check dark/light theme appearance

---

## 10. Professional Design Principles Applied

✅ **Modern Typography**: Large, bold headers with proper hierarchy
✅ **Whitespace**: Generous padding and spacing for breathability
✅ **Color Coding**: Each section has distinct accent colors
✅ **Glass Morphism**: Subtle frosted glass effects on dark mode
✅ **Hover States**: Interactive feedback on all interactive elements
✅ **Animations**: Smooth transitions and entrance effects
✅ **Responsive**: Mobile-first design that scales beautifully
✅ **Accessibility**: Proper contrast ratios and semantic HTML

---

## Next Steps

1. **Add real images** to `/public/images/` folder
2. **Update each ImagePlaceholder** with src prop
3. **Test responsive design** on mobile, tablet, desktop
4. **Fine-tune spacing** if needed
5. **Optimize images** for web performance

All sections now fit within screen sizes and are ready for professional images!
