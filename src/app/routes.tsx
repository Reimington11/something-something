import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Catalog } from "./components/Catalog";
import { BookDetail } from "./components/BookDetail";
import { Profile } from "./components/Profile";
import { Loans } from "./components/Loans";
import { Fines } from "./components/Fines";
import { About } from "./components/About";
import { RequestBook } from "./components/RequestBook";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminScanner } from "./components/AdminScanner";
import { Notifications } from "./components/Notifications";

import { AdminFinesTracking } from "./components/AdminFinesTracking";
import { AdminLoans } from "./components/AdminLoans";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "home", Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "book/:id", Component: BookDetail },
      { path: "profile", Component: Profile },
      { path: "loans", Component: Loans },
      { path: "fines", Component: Fines },
      { path: "about", Component: About },
      { path: "request-book", Component: RequestBook },
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/scanner", Component: AdminScanner },
      { path: "admin/loans", Component: AdminLoans },
      { path: "admin/fines-tracking", Component: AdminFinesTracking },
      { path: "notifications", Component: Notifications },
    ],
  },
]);

