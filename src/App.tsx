// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/landing.nav.foot/Navbar";
import { Hero } from "./components/landing.sections/Hero";
import { AboutUs } from "./components/landing.sections/AboutUs";
import { Features } from "./components/landing.sections/Features";
import { HowItWorks } from "./components/landing.sections/HowItWorks";
import { Testimonials } from "./components/landing.sections/Testimonials";
import { FAQ } from "./components/landing.sections/faq";
import { Footer } from "./components/landing.nav.foot/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/N.AdminDashboard/BusinessDashB/DashboardView";
import SuperAdminDashboard from "./pages/S.AdminDashboard/SuperAdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <div className="min-h-screen font-sans text-gray-900 bg-white">
                <Navbar />
                <main>
                  <Hero />
                  <AboutUs />
                  <Features />
                  <HowItWorks />
                  <Testimonials />
                  <FAQ />
                </main>
                <Footer />
              </div>
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
