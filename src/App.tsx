import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigationType } from "react-router-dom";
import { useLayoutEffect } from "react";
import Index from "./pages/Index";
import { RepairsIndex, RepairDetail } from "./pages/Repairs";
import { DevicesIndex, DeviceDetail } from "./pages/Devices";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";
import Warranty from "./pages/Warranty";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    // Let the browser restore scroll on back/forward; reset to top otherwise.
    // "instant" overrides the global `scroll-behavior: smooth` so the new page
    // starts at the top immediately instead of animating up from the bottom.
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, navigationType]);

  return null;
};

const RepairDetailPage = () => {
  const { slug } = useParams();
  return <RepairDetail slug={slug || ""} />;
};

const DeviceDetailPage = () => {
  const { slug } = useParams();
  return <DeviceDetail slug={slug || ""} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/repairs" element={<RepairsIndex />} />
          <Route path="/repairs/:slug" element={<RepairDetailPage />} />
          <Route path="/devices" element={<DevicesIndex />} />
          <Route path="/devices/:slug" element={<DeviceDetailPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/warranty-policy" element={<Warranty />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
