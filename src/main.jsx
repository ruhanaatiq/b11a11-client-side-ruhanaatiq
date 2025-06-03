import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import MainLayout from "./layouts/MainLayout.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
{ path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <ErrorPage /> }, // 404 page
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
