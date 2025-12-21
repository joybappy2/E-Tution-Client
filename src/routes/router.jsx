import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import StudentRoute from "./StudentRoute";
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";
import StudentDashboard from "../pages/Dashboard/StudentDashboard/StudentDashboard";
import TeacherDashboard from "../pages/Dashboard/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import PostTution from "../pages/Dashboard/StudentDashboard/PostTution/PostTution";
import MyTutions from "../pages/Dashboard/StudentDashboard/MyTutions/MyTutions";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement/UserManagement";
import TutionManagement from "../pages/Dashboard/AdminDashboard/TutionManagement/TutionManagement";
import ReportsAnalytics from "../pages/Dashboard/AdminDashboard/ReportsAnalytics/ReportsAnalytics";
import TutionDetails from "../pages/TutionDetails/TutionDetails";
import AllTutions from "../pages/AllTutions/AllTutions";
import AppliedTutor from "../pages/Dashboard/StudentDashboard/AppliedTutor/AppliedTutor";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tutions",
        element: (
          <PrivateRoute>
            <AllTutions></AllTutions>
          </PrivateRoute>
        ),
      },
      {
        path: "tution-details/:id",
        element: (
          <PrivateRoute>
            <TutionDetails></TutionDetails>
          </PrivateRoute>
        ),
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
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: <p>Admin Dashboard Home</p>,
          },
          {
            path: "manage-users",
            element: <UserManagement></UserManagement>,
          },
          {
            path: "manage-tutions",
            element: <TutionManagement></TutionManagement>,
          },
          {
            path: "manage-reports",
            element: <ReportsAnalytics></ReportsAnalytics>,
          },
        ],
      },

      {
        path: "teacher",
        element: (
          <TeacherRoute>
            <TeacherDashboard></TeacherDashboard>
          </TeacherRoute>
        ),
      },

      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard></StudentDashboard>,
          </StudentRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <p>
                <span className="text-2xl md:text-3xl font-semibold">
                  Student Dashboard Home{" "}
                </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                voluptas ullam, voluptate commodi, est placeat eveniet possimus
              </p>
            ),
          },

          {
            path: "my-tutions",
            element: <MyTutions></MyTutions>,
          },
          {
            path: "post-tution",
            element: <PostTution></PostTution>,
          },
          {
            path: "applied-tutors",
            element: <AppliedTutor></AppliedTutor>,
          },
          {
            path: "payments",
            element: <p>Payments</p>,
          },
          {
            path: "settings",
            element: <p>Profile Settings</p>,
          },
        ],
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
