import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Coiffure from "./pages/Coiffure";
import Pedicure from "./pages/Pedicure";
import AdminLogin from "./pages/AdminLogin";
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
          <Route path="/coiffure" element={<Coiffure />} />
          <Route path="/pedicure" element={<Pedicure />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollUp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
