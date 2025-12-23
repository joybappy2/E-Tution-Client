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
import TutionDetails from "../pages/TutionDetails/TutionDetails";
import AllTutions from "../pages/AllTutions/AllTutions";
import AppliedTutor from "../pages/Dashboard/StudentDashboard/AppliedTutor/AppliedTutor";
import MyApplications from "../pages/Dashboard/TeacherDashboard/MyApplications/MyApplications";
import PaymentSuccess from "../pages/Dashboard/StudentDashboard/AppliedTutor/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/StudentDashboard/PaymentCancelled";
import RevenueHistory from "../pages/Dashboard/TeacherDashboard/RevenueHistory/RevenueHistory";
import AllTutors from "../pages/AllTutors/AllTutors";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import StudentProfile from "../pages/Dashboard/StudentDashboard/StudentProfile/StudentProfile";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import TeacherProfile from "../pages/Dashboard/TeacherDashboard/TeacherProfile/TeacherProfile";

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
        path: "tutors",
        element: (
          <PrivateRoute>
            <AllTutors></AllTutors>
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
            path: "profile-settings",
            element: <AdminProfile></AdminProfile>,
          },
        ],
      },

      {
        path: "tutor",
        element: (
          <TeacherRoute>
            <TeacherDashboard></TeacherDashboard>
          </TeacherRoute>
        ),
        children: [
          {
            index: true,
            element: <p>Tutor Dashboard Home</p>,
          },
          {
            path: "my-applications",
            element: <MyApplications></MyApplications>,
          },
          {
            path: "on-going-tutions",
            element: <p>On going Tutions</p>,
          },
          {
            path: "revenue-history",
            element: <RevenueHistory></RevenueHistory>,
          },
          {
            path: 'profile-settings',
            element: <TeacherProfile></TeacherProfile>
          }
        ],
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
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            path: "profile-settings",
            element: <StudentProfile></StudentProfile>,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess></PaymentSuccess>,
          },
          {
            path: "payment-cancelled",
            element: <PaymentCancelled></PaymentCancelled>,
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
