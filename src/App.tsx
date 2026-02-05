import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/hooks/useTheme";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import GlobalChatButton from "@/components/GlobalChatButton";
import BubblesBackground from "@/components/backgrounds/BubblesBackground";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CategoryPage from "./pages/CategoryPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect || "/");
    }
  }, [navigate]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/services/:categorySlug"
          element={
            <PageTransition>
              <CategoryPage />
            </PageTransition>
          }
        />
        <Route
          path="/services/:categorySlug/:serviceSlug"
          element={
            <PageTransition>
              <ServiceDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <BlogPage />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <BlogPostPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicyPage />
            </PageTransition>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary>
                <BubblesBackground className="fixed inset-0 z-0" />
                <RedirectHandler />
                <AnimatedRoutes />
                <FloatingActionButtons />
                <GlobalChatButton />
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </MotionConfig>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
