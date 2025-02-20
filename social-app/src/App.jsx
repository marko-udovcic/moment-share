import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import Moment from "./pages/Moment";

export default function App() {
  return (
    <ProfileProvider>
      <Router>
        <div
          className="sm:max-w-[calc(100%-160px)] mx-auto min-h-screen border-[2px] border-t-0 border-white bg-slate-900 px-0 pt-4
            relative lg:mx-[5%] 2xl:mx-[10%]"
        >
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
      </Router>
    </ProfileProvider>
  );
}
