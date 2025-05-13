import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <NavBar />
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
