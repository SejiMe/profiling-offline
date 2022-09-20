import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import React from "react";


function MainLayout({ children }) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
