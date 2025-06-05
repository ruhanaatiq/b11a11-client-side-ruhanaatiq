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
import AvailableCars from './pages/AvailableCars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import AddCar from './pages/AddCar.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import MyCars from './pages/MyCars.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
      { path: '/', element: <Home /> }, 
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <ErrorPage /> }, // 404 fallback
      {path:'/available-cars', element: <AvailableCars />} ,
      {path:'/cars/:id',  element:<CarDetails />} ,
       {path:'/add-car', element: <PrivateRoute><AddCar /></PrivateRoute>},
       {path:'/my-cars',element:<PrivateRoute><MyCars/></PrivateRoute>},
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
