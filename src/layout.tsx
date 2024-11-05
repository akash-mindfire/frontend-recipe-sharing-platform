import React from "react";
import Navbar from "./components/navbar"; // Adjust the path as needed
import Footer from "./components/footer"; // Adjust the path as needed

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 200px)", padding: "1rem" }}>
        {/* Adjust minHeight based on your header and footer size */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
