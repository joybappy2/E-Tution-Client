import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import StudentRoute from "./StudentRoute";
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },

      {
        path: "admin",
        element: (
          <AdminRoute>
            <p>Dashboard Of Admin</p>
          </AdminRoute>
        ),
      },

      {
        path: "teacher",
        element: (
          <TeacherRoute>
            <p>Dashboard Of Teachers</p>
          </TeacherRoute>
        ),
      },

      {
        path: "student",
        element: (
          <StudentRoute>
            <p>Dashboard Of Students</p>
          </StudentRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <h2 className="text-7xl text-center font-bold min-h-screen flex justify-center items-center">
        Error 404
        <br />
        Page Not Found
      </h2>
    ),
  },
]);

export default router;
