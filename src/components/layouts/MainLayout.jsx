import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import React from 'react';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
