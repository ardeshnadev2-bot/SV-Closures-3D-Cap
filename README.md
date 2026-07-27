This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

📁 C:/__catalouge__/
├── 📁 src/                             # Source code
│   ├── 📁 app/                         # Next.js App Router (Pages & Styles)
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 globals.css              # Global styles (Tailwind CSS v4 & custom animations)
│   │   ├── 📄 layout.tsx               # Root layout structure (providers & fonts)
│   │   └── 📄 page.tsx                 # Main Single Page Application entrypoint
│   └── 📁 components/                  # Modular React UI Components
│       ├── 📄 Navbar.tsx               # Navigation bar with ScrollSpy and progress indicator
│       ├── 📄 HeroSection.tsx          # Hero page layout, statistics, and CTA buttons
│       ├── 📄 Hero3DCanvas.tsx         # Three.js (React Three Fiber) bottle cap simulation
│       ├── 📄 ClienteleSection.tsx     # Grid of key partners and clients
│       ├── 📄 ProductRanges.tsx        # High-level product categories
│       ├── 📄 ProductsSection.tsx      # Comprehensive list of products & tech specifications
│       ├── 📄 AboutSection.tsx         # Brand history, vision, and core team details
│       ├── 📄 IndustriesSection.tsx    # Details on served sectors (Lubricants, Chemicals, etc.)
│       ├── 📄 InfrastructureSection.tsx# Manufacturing facilities, molding, and testing lab info
│       ├── 📄 SustainabilitySection.tsx# Eco-friendly practices and recycling details
│       ├── 📄 GlobalReachMap.tsx       # Interactive global SVG exporter map
│       ├── 📄 Certifications.tsx       # FDA, GMP, and ISO certification badges
│       ├── 📄 GallerySection.tsx       # Photo gallery showing factory floor operations
│       ├── 📄 ContactSection.tsx       # Enquiry form and address details
│       ├── 📄 Footer.tsx               # Footer links & copyright information
│       ├── 📄 Chatbot.tsx              # Floating automated helpdesk widget
│       ├── 📄 WhatsAppButton.tsx       # Quick connect Floating Action Button (FAB)
│       ├── 📄 ThemeProvider.tsx        # Dark/Light mode React context provider
│       └── 📄 ThemeToggle.tsx          # Button toggle for light/dark mode switching
├── 📁 public/                          # Static Assets
│   └── 📁 images/                      # Project images, logo, product shots, and maps
└── 🛠️ Config Files
    ├── 📄 package.json                 # Project dependencies (Next, Three.js, GSAP, Tailwind v4)
    ├── 📄 tsconfig.json                # TypeScript configurations
    ├── 📄 next.config.ts               # Next.js bundler and compilation rules
    └── 📄 AGENTS.md                    # Special next.js instructions for agent operations