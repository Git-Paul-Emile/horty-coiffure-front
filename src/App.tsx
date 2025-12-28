import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Coiffure from "./pages/Coiffure";
import Pedicure from "./pages/Pedicure";
import PublicProducts from "@/pages/PublicProducts";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Realizations from "./pages/Realizations";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";
import ScrollUp from "./components/ScrollUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produits" element={<PublicProducts />} />
          <Route path="/coiffure" element={<Coiffure />} />
          <Route path="/pedicure" element={<Pedicure />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/partners" element={<Partners />} />
          <Route path="/admin/realizations" element={<Realizations />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollUp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
