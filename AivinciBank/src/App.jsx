"use client";

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SimpleTransitions from "./components/SimpleTransitions";
import MobileApp from "./components/MobileApp";
import Calculator from "./components/Calculator";
import CardOrder from "./components/CardOrder";
import OtherServices from "./components/OtherServices";
import News from "./components/News";
import Services from "./components/Services";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./components/ThemeContext";

import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth, useAuthState } from "./store/hooks/useAuthHook";
import Loader from "./components/Loader";
import AdminPanel from "./pages/AdminPanel";

function AppContent() {
  const location = useLocation();
  const [customerType, setCustomerType] = useState("fiziki");
  const navigate = useNavigate();

  const { GetUserInfo } = useAuth();
  const { isUserFetching, user, isLoggedIn } = useAuthState();

  useEffect(() => {
    const fetch = async () => {
      if (isLoggedIn) {
        await GetUserInfo();
      }
    };
    fetch();
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "USER") {
        navigate("/user");
      } else {
        navigate("/404");
      }
    }
  }, [user]);

  const hideLayoutRoutes = ["/user", "/admin"];
  // const hideLayoutRoutes = ["/user"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const hideChatbotRoutes = ["/register", "/login", "/admin"];
  // const hideChatbotRoutes = ["/register", "/login"];

  const hideChatbot = hideChatbotRoutes.includes(location.pathname);

  if (isUserFetching) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!hideLayout && (
        <Header customerType={customerType} setCustomerType={setCustomerType} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main className="flex-grow">
              {customerType === "fiziki" ? (
                <>
                  <Hero />
                  <SimpleTransitions />
                  <MobileApp />
                  <Calculator />
                  <CardOrder />
                  <OtherServices />
                  <News />
                  <Services />
                  <Faq />
                </>
              ) : (
                <div className="container mx-auto mt-16 py-40 text-center">
                  <h2 className="text-3xl font-bold">Biznes səhifəsi</h2>
                  <p className="mt-4">Biznes səhifəsi hazırlanır...</p>
                </div>
              )}
            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserPanel />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideChatbot && <ChatBot />}
      {!hideLayout && <ScrollToTop />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
