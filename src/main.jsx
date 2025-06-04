import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';

// ✅ Import missing components
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
      { path: '/', element: <Home /> }, 
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <ErrorPage /> }, // 404 fallback
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
