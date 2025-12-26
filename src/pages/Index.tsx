import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LoyaltySection from "@/components/LoyaltySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <LoyaltySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
