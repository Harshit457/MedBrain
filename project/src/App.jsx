import React from "react";
import SettingsPage from "./pages/SettingsPage";
import { ChatBot } from "./pages/RealChatBot";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuizComponent from "./pages/ChatBot";
import { Loader } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { useAuthStore } from "./store/useAuthStore";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import LandingPage from "./pages/LandingPages";
import ImageUploadComponent from "./pages/Diagnos";
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/getstarted" />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/getstarted"
              element={!authUser ? <LandingPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/diagnos"
              element={authUser ? <ImageUploadComponent /> : <Navigate to="/login" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/bot" element={authUser ? <ChatBot /> : <Navigate to="/login" />} />
            <Route
              path="/quiz"
              element={authUser ? <QuizComponent /> : <Navigate to="/login" />}
            />
            <Route
              path="/prescription/:id"
              element={
                authUser ? <PrescriptionDetail /> : <Navigate to="/login" />
              }
            />
          </Routes>
          <Toaster />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
