import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/layout/Header";
import HeroSection from "@/components/shared/HeroSection";
import ServicesSection from "@/features/services/components/ServicesSection";
import ProductsSection from "@/features/products/components/ProductsSection";
import PartnersSection from "@/features/partners/components/PartnersSection";
import GallerySection from "@/components/shared/GallerySection";
import TestimonialsSection from "@/features/testimonials/components/TestimonialsSection";
import LoyaltySection from "@/components/shared/LoyaltySection";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/layout/Footer";
import EdgeTab from "@/components/shared/EdgeTab";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main className="overflow-x-hidden">
      <Header />
      <EdgeTab />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <PartnersSection />
      <GallerySection />
      <TestimonialsSection />
      <LoyaltySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
