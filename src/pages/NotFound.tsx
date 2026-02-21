
import React from "react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24" style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      <div className="text-center max-w-lg">
        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '6rem', fontWeight: 300, color: 'var(--lotus-gold)', lineHeight: 1 }}>404</h1>
        <div className="w-24 h-px mx-auto my-8" style={{ background: 'var(--lotus-gold)' }}></div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>Page Not Found</h2>
        <p className="mb-8" style={{ color: 'var(--lotus-muted)' }}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
