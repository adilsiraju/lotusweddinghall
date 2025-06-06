
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical images to improve initial load performance
const criticalImages = [
  '/about-hero.jpg',
  '/hero-wedding.jpg',
  '/logo-white.png',
  '/team/director.jpg',
  '/team/jmd.jpg',
  '/about/venue-history.jpg'
];

// Add a phone icon to preload to ensure it loads quickly for call buttons
criticalImages.push('/icons/phone.svg');

criticalImages.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = src;
  link.as = 'image';
  document.head.appendChild(link);
});

createRoot(document.getElementById("root")!).render(<App />);
