import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import LamndingPage from "./pages/LandingPage";
import Navbar from "./components/LandingPageComponents/Navbar";
import { useAuthStore } from "./store/AuthStore";
import AuthListener from "./hooks/AuthListener";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Topbar from "./components/Dashboard/Topbar";
import JournalPage from "./pages/Dashboard/JournalPage";
import ReportsPage from "./pages/Dashboard/ReportsPage";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Wait for Clerk to initialize

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  } 
 
  return <>{children}</>;
};

function App() {

  const { isSignedIn, isLoaded } = useUser();
  const loading = useAuthStore((s) => s.loading);

  if ( loading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="size-10 animate-spin green" />
        </div>
      </div>
    );
  }

  return (
    <>
    <AuthListener />
      <Routes>

        {/* Public Route Group */}
        <Route path="/" element={ isSignedIn ? (<Navigate to="/dashboard" replace />) : (<> <Navbar /> <LamndingPage /></> )} />

        {/* Protected Route Group */}
        <Route path="/dashboard" element={ <> <ProtectedRoute> <Topbar /> <DashboardPage /> </ProtectedRoute></> } />
        <Route path="/dashboard/journal" element={ <> <ProtectedRoute> <Topbar /> <JournalPage /> </ProtectedRoute></> } />
        <Route path="/dashboard/reports" element={ <> <ProtectedRoute> <Topbar /> <ReportsPage /> </ProtectedRoute></> } />

        {/* Catch-all: Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111827",   // gray-900 — matches dark dashboard bg
            color: "#f9fafb",        // gray-50
            borderRadius: "8px",
            border: "1px solid #374151",  // gray-700 border
            fontSize: "14px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",    // emerald-500
              secondary: "#111827",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",    // red-500
              secondary: "#111827",
            },
          },
        }}
      />
    </>
  );
}

export default App;