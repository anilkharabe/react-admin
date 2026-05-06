import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../protectedRoute";
import AdminDashboard from "../pages/adminDashboard";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public pages or URLs */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected pages or URLs */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
