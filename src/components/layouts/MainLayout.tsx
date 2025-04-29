
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20"> {/* Add padding top to account for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
