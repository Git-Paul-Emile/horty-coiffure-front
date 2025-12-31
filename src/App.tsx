import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Coiffure from "./pages/Coiffure";
import Pedicure from "./pages/Pedicure";
import Beaute from "./pages/Beaute";
import PublicProducts from "@/pages/PublicProducts";
import Actualites from "./pages/Actualites";
import Feedback from "./pages/Feedback";
import AdminLogin from "./features/auth/components/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Prestations from "./pages/Prestations";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Realizations from "./pages/Realizations";
import Appointments from "./pages/Appointments";
import Testimonials from "./pages/Testimonials";
import Categories from "./pages/Categories";
import ProductCategories from "./pages/ProductCategories";
import News from "./pages/News";
import Feedbacks from "./pages/Feedbacks";
import NotFound from "./pages/NotFound";
import ScrollUp from "./components/shared/ScrollUp";
import FloatingAppointmentButton from "./components/shared/FloatingAppointmentButton";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('horty-visited');
    if (!hasVisited) {
      // Incrémenter le compteur de visites
      fetch('https://api.countapi.xyz/hit/horty-coiffure/visits')
        .then(() => {
          localStorage.setItem('horty-visited', 'true');
        })
        .catch(error => console.error('Erreur lors de l\'incrémentation des visites:', error));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/produits" element={<PublicProducts />} />
        <Route path="/coiffure" element={<Coiffure />} />
        <Route path="/pedicure" element={<Pedicure />} />
        <Route path="/beaute" element={<Beaute />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/prestations" element={<Prestations />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/partners" element={<Partners />} />
        <Route path="/admin/realizations" element={<Realizations />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/testimonials" element={<Testimonials />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/product-categories" element={<ProductCategories />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/feedbacks" element={<Feedbacks />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollUp />
      {!isAdminPage && <FloatingAppointmentButton />}
      <Analytics />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
