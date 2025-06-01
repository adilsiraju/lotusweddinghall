# Lotus Wedding & Banquet Hall Website

A modern, responsive website for Lotus Wedding & Banquet Hall in Thalassery, Kerala - a premier venue for weddings, receptions, and special events.

## 🌟 Project Overview

This is a comprehensive website showcasing Lotus Wedding & Banquet Hall, featuring:
- **Interactive Gallery** with venue area management
- **Dynamic Menu Packages** for lunch and dinner events  
- **Admin Dashboard** for content management
- **Contact Forms** with email integration
- **Responsive Design** optimized for all devices
- **SEO Optimized** for better search visibility

**Live URL**: https://lovable.dev/projects/ab764f62-0256-41ef-98cb-5410c62c4616

## ✨ Key Features

### 🖼️ Gallery Management
- **Dynamic Image Gallery** with venue area categorization
- **Admin Interface** for uploading and organizing images
- **Featured Images** system for homepage highlights
- **Video Management** for promotional content
- **Responsive Grid Layout** with lazy loading

### 📋 Package Management
- **Lunch & Dinner Packages** with detailed menus
- **Custom Package Creation** through admin panel
- **Meal Type Categorization** (lunch, dinner, both)
- **Dynamic Pricing Display** with customization options

### 👨‍💼 Admin Dashboard
- **Secure Authentication** with Supabase Auth
- **Content Management System** for all venue content
- **Venue Area Management** with hierarchical structure
- **Package & Menu Administration**
- **Gallery Organization Tools**

### 📞 Contact & Booking
- **Contact Form** with email integration via Resend
- **WhatsApp Integration** for direct communication
- **Event Type Selection** and date booking
- **Automated Email Confirmations**

### 🎨 User Experience
- **Responsive Design** for mobile, tablet, and desktop
- **Smooth Animations** with Framer Motion
- **SEO Optimized** with proper meta tags
- **Performance Optimized** with image compression
- **Accessibility Focused** with ARIA labels and semantic HTML

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layouts/        # Layout components
├── pages/              # Main application pages
│   ├── Admin/          # Admin dashboard pages
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   ├── Gallery.tsx     # Gallery showcase
│   ├── Index.tsx       # Homepage
│   └── Packages.tsx    # Menu packages
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git for version control

### Getting Started

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to project directory
cd lotusweddinghall

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open http://localhost:5173 in your browser
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run build:dev` - Build development bundle
- `npm run build:analyze` - Build and analyze bundle composition
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Development Workflow

### Using Lovable (Recommended)
1. Visit the [Lovable Project](https://lovable.dev/projects/ab764f62-0256-41ef-98cb-5410c62c4616)
2. Use natural language prompts to make changes
3. Changes are automatically committed to this repository

### Using Local IDE
1. Make changes in your preferred IDE
2. Test locally with `npm run dev`
3. Commit and push changes
4. Changes will be reflected in Lovable automatically

### Using GitHub
- **Direct Editing**: Click "Edit" button on any file in GitHub
- **GitHub Codespaces**: Use the "Code" → "Codespaces" → "New codespace" option

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI Components
- **shadcn/ui** - High-quality component library built on Radix UI
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful SVG icons
- **React Hook Form** - Performant forms with validation

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **TanStack Query** - Powerful data fetching and caching
- **Zod** - TypeScript-first schema validation

### Additional Features
- **React Router DOM** - Client-side routing
- **Embla Carousel** - Touch-friendly carousels
- **Recharts** - Responsive chart library
- **Date-fns** - Modern date utility library
- **Image optimization** with Vite plugins

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing with Autoprefixer
- **Lovable Tagger** - Development workflow optimization

## 🚀 Deployment

### Quick Deploy with Lovable
1. Open [Lovable](https://lovable.dev/projects/ab764f62-0256-41ef-98cb-5410c62c4616)
2. Click **Share → Publish**
3. Your site will be live instantly!

### Custom Domain Setup
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the [custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🆓 Free Deployment Options with Custom Domain

### Option 1: Netlify (Recommended for Static Sites)

**Step 1: Prepare Your Build**
```bash
# Build the project
npm run build

# This creates a 'dist' folder with your static files
```

**Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. **Option A - Drag & Drop**: Drag your `dist` folder to Netlify dashboard
3. **Option B - Git Integration**: 
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

**Step 3: Custom Domain Setup**
1. In Netlify dashboard → **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `lotusweddinghall.com`)
4. Update your domain's DNS settings:
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Option 2: Vercel (Great for React Apps)

**Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

**Step 2: Deploy**
```bash
# From your project root
vercel

# Follow the prompts:
# - Link to existing project? N
# - Project name: lotusweddinghall
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
```

**Step 3: Custom Domain**
1. Go to [vercel.com](https://vercel.com) dashboard
2. Select your project → **Settings** → **Domains**
3. Add your custom domain
4. Configure DNS with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Option 3: GitHub Pages

**Step 1: Create GitHub Actions Workflow**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**Step 2: Enable GitHub Pages**
1. Go to your GitHub repository
2. **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages**

**Step 3: Custom Domain**
1. In **Settings** → **Pages** → **Custom domain**
2. Enter your domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A (for apex domain)
   Name: @
   Values: 
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

### Option 4: Firebase Hosting

**Step 1: Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

**Step 2: Initialize Firebase**
```bash
firebase init hosting

# Select:
# - Use existing project or create new one
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No
```

**Step 3: Deploy**
```bash
npm run build
firebase deploy
```

**Step 4: Custom Domain**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. **Hosting** → **Add custom domain**
3. Follow DNS setup instructions provided

## 🌐 Free Domain Options

If you don't have a domain yet, here are free options:

### Free Domains:
1. **Freenom** (.tk, .ml, .ga, .cf) - Free for 1 year
2. **GitHub Pages** subdomain (username.github.io/repository)
3. **Netlify** subdomain (project-name.netlify.app)
4. **Vercel** subdomain (project-name.vercel.app)

### Affordable Domains ($1-12/year):
1. **Namecheap** - Often has $0.99 .com deals
2. **Porkbun** - Competitive pricing
3. **Cloudflare Registrar** - At-cost pricing
4. **Google Domains** - Simple setup

## 🔧 Deployment Troubleshooting

### Common Issues:

**1. Environment Variables**
Add environment variables in your hosting platform:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**2. 404 Errors on Refresh**
Add `_redirects` file to `public` folder:
```
/*    /index.html   200
```

**3. Build Errors**
Check Node.js version compatibility:
```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

## 📋 Pre-Deployment Checklist

- [ ] Update environment variables for production
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Optimize images in `public` folder
- [ ] Verify all links work correctly
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Validate SEO meta tags
- [ ] Test loading speed

## 🚀 Recommended Workflow

1. **Start with Netlify** (easiest for beginners)
2. **Get a custom domain** from Namecheap/Porkbun
3. **Set up DNS** as instructed above
4. **Enable HTTPS** (automatic with most platforms)
5. **Monitor performance** with built-in analytics

Your Lotus Wedding Hall website will be live on your custom domain within 24-48 hours after DNS propagation!

## 🏢 About Lotus Wedding & Banquet Hall

**Location**: Thalassery, Kerala (150m from Railway Station)  
**Established**: 2019  
**Specialties**: 
- Traditional Kerala Sadhya
- Wedding Ceremonies & Receptions  
- Corporate Events
- Cultural Celebrations

**Contact Information**:
- 📞 Phone: +91 920 710 2999
- 📧 Email: info@lotusweddinghall.com
- 🌐 Website: https://lotusweddinghall.in
- 📱 WhatsApp: Direct booking integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is developed for Lotus Wedding & Banquet Hall. All rights reserved.

---

*Built with ❤️ using modern web technologies for an exceptional user experience.*