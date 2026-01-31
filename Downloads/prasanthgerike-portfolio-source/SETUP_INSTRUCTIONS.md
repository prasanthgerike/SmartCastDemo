# Prasanth Gerike Portfolio - Setup Instructions

## Overview
This is a modern, professional SAP consultant portfolio website built with React 19, Tailwind CSS 4, and TypeScript.

## Tech Stack
- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 with custom glassmorphism design
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: Wouter (lightweight client-side router)
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Project Structure
```
prasanth-portfolio/
├── client/
│   ├── public/
│   │   └── images/          # Generated portfolio images
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Home.tsx)
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── lib/             # Utility functions
│   │   ├── App.tsx          # Main app router
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles & design tokens
│   └── index.html           # HTML template
├── server/                   # Express server (static deployment)
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
└── vite.config.ts           # Vite configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+ (recommended 20+)
- pnpm (or npm/yarn)

### Step 1: Install Dependencies
```bash
cd prasanth-portfolio
pnpm install
```

### Step 2: Run Development Server
```bash
pnpm run dev
```
The site will be available at `http://localhost:5173`

### Step 3: Build for Production
```bash
pnpm run build
```

### Step 4: Preview Production Build
```bash
pnpm run preview
```

## Key Features

### Design System
- **Glassmorphism Design**: Translucent frosted glass cards with backdrop blur effects
- **Color Palette**: Deep indigo to midnight blue gradient background with cyan/violet accents
- **Typography**: Outfit font for headings, Inter for body text, Fira Code for technical elements
- **Animations**: Smooth spring physics animations and hover effects

### Content Sections
1. **Hero Section** - Animated introduction with call-to-action buttons
2. **Key Metrics** - 4 important achievement metrics with glass cards
3. **Professional Experience** - 3 detailed job positions with achievements and technologies
4. **Featured Projects** - 3 major SAP implementation projects with impact metrics
5. **Skills & Expertise** - Organized into 3 categories (Core SAP, Process & Support, Certifications)
6. **Education & Certifications** - Academic degrees and professional certifications
7. **Contact Section** - Email, phone, LinkedIn with call-to-action buttons

### Interactive Elements
- Smooth scroll navigation
- Tab-based content switching
- Hover effects on cards
- Responsive design (mobile, tablet, desktop)
- Fixed navigation bar

## Customization Guide

### Update Personal Information
Edit `client/src/pages/Home.tsx`:
- Line 8: Change name and title
- Line 77-88: Update hero section text
- Line 371-382: Update contact information
- Line 393: Update LinkedIn URL

### Modify Colors
Edit `client/src/index.css`:
- Lines 50-100: Update CSS custom properties (--primary, --accent, etc.)
- Colors use OKLCH format for better color management

### Add/Remove Experience Entries
In `client/src/pages/Home.tsx`, find the Experience Tab section and add/remove `<ExperienceCard>` components.

### Update Project Images
Replace images in `client/public/images/`:
- `hero-background.png` - Hero section background
- `sap-visualization.png` - SAP system architecture
- `data-analytics.png` - Analytics visualization
- `enterprise-tech.png` - Supply chain visualization

### Change Fonts
Edit `client/index.html`:
- Lines 10-12: Modify Google Fonts import
- Update font names in `client/src/index.css` (lines 42-44)

## Deployment Options

### Option 1: Manus Hosting (Recommended)
Use the Manus platform's Publish button for instant deployment with custom domains.

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 4: GitHub Pages
Build and push the `dist/` folder to your GitHub Pages repository.

## Environment Variables
No environment variables required for this static portfolio. All content is hardcoded in the React components.

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization
- Images are optimized and served from `/public/images/`
- CSS is minified by Tailwind
- JavaScript is bundled and minified by Vite
- Lazy loading for images (native browser support)

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
pnpm run dev -- --port 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### Images Not Loading
- Ensure images are in `client/public/images/`
- Check image paths in Home.tsx match actual filenames
- Images should be referenced as `/images/filename.png`

## Support & Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite Guide](https://vitejs.dev)

## License
This portfolio template is provided as-is for personal use.

---

**Ready to customize?** Start by editing `client/src/pages/Home.tsx` with your own content!
