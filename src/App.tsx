import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Services from "./pages/Services";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CancellationPolicy from "./pages/CancellationPolicy";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminProviders from "./pages/admin/AdminProviders";
import AdminDrivers from "./pages/admin/AdminDrivers";
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientBookings from "./pages/client/ClientBookings";
import ClientBookingDetail from "./pages/client/ClientBookingDetail";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute requiredRole="admin"><AdminBookings /></ProtectedRoute>} />
            <Route path="/admin/providers" element={<ProtectedRoute requiredRole="admin"><AdminProviders /></ProtectedRoute>} />
            <Route path="/admin/drivers" element={<ProtectedRoute requiredRole="admin"><AdminDrivers /></ProtectedRoute>} />

            {/* Client */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/register" element={<ClientRegister />} />
            <Route element={<Layout />}>
              <Route path="/client/bookings" element={<ProtectedRoute><ClientBookings /></ProtectedRoute>} />
              <Route path="/client/bookings/:id" element={<ProtectedRoute><ClientBookingDetail /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
