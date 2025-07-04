
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import HostelsPage from "@/pages/HostelsPage";
import HostelDetailPage from "@/pages/HostelDetailPage";
import StudentDashboard from "@/pages/StudentDashboard";
import OwnerDashboard from "@/pages/OwnerDashboard";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/hostels" element={<Layout><HostelsPage /></Layout>} />
            <Route path="/hostels/:id" element={<Layout><HostelDetailPage /></Layout>} />
            <Route path="/student-dashboard" element={<Layout><StudentDashboard /></Layout>} />
            <Route path="/owner-dashboard" element={<Layout><OwnerDashboard /></Layout>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
