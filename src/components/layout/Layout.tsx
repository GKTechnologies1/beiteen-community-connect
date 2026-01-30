import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { PageTransition } from "@/components/motion";
import ScrollHint from "@/components/ScrollHint";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ScrollHint />
    </div>
  );
};

export default Layout;
