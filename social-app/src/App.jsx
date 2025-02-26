import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ui/ProtectedRoute";
const Create = lazy(() => import("./pages/Create"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Moment = lazy(() => import("./pages/Moment"));
export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ProfileProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="sm:max-w-[calc(100%-160px)] mx-auto min-h-screen bg-slate-900 px-0 pt-4 relative lg:mx-[5%] 2xl:mx-[10%]">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/user/:id/:username" element={<UserProfile />} />
                  <Route path="/moment/:id" element={<Moment />} />
                </Route>
              </Routes>
            </div>
          </Suspense>
        </Router>
      </ProfileProvider>
    </>
  );
}
