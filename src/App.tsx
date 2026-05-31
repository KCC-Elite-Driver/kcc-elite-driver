import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ScrollToTop from "@/components/ScrollToTop";

const Fleet = lazy(() => import("./pages/Fleet"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Booking = lazy(() => import("./pages/Booking"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminProviders = lazy(() => import("./pages/admin/AdminProviders"));
const AdminDrivers = lazy(() => import("./pages/admin/AdminDrivers"));
const AdminPricing = lazy(() => import("./pages/admin/AdminPricing"));
const ClientLogin = lazy(() => import("./pages/client/ClientLogin"));
const ClientRegister = lazy(() => import("./pages/client/ClientRegister"));
const ClientBookings = lazy(() => import("./pages/client/ClientBookings"));
const ClientBookingDetail = lazy(() => import("./pages/client/ClientBookingDetail"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const BookingReturn = lazy(() => import("./pages/BookingReturn"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const PageFallback = () => (
  <div className="min-h-screen bg-background" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Public site */}
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cancellation-policy" element={<CancellationPolicy />} />
                <Route path="/legal" element={<Legal />} />
              </Route>

              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/booking/return" element={<BookingReturn />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute requiredRole="admin"><AdminBookings /></ProtectedRoute>} />
              <Route path="/admin/providers" element={<ProtectedRoute requiredRole="admin"><AdminProviders /></ProtectedRoute>} />
              <Route path="/admin/drivers" element={<ProtectedRoute requiredRole="admin"><AdminDrivers /></ProtectedRoute>} />
              <Route path="/admin/pricing" element={<ProtectedRoute requiredRole="admin"><AdminPricing /></ProtectedRoute>} />

              {/* Client */}
              <Route path="/client/login" element={<ClientLogin />} />
              <Route path="/client/register" element={<ClientRegister />} />
              <Route element={<Layout />}>
                <Route path="/client/bookings" element={<ProtectedRoute><ClientBookings /></ProtectedRoute>} />
                <Route path="/client/bookings/:id" element={<ProtectedRoute><ClientBookingDetail /></ProtectedRoute>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
