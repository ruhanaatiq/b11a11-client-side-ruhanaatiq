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
import MyBookings from './pages/MyBookings.jsx';
import LearnMore from './pages/LearnMore.jsx';
import Deals from './pages/Deals.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import Feedback from './pages/Feedback.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
     { index: true, element: <Home /> }, 
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <ErrorPage /> }, // 404 fallback
      {path:'/available-cars', element: <AvailableCars />} ,
      {path:'/cars/:id',  element:<CarDetails />} ,
       {path:'/add-car', element: <PrivateRoute><AddCar /></PrivateRoute>},
       {path:'/my-cars',element:<PrivateRoute><MyCars/></PrivateRoute>},
       {path:'/my-bookings',element:<PrivateRoute><MyBookings/></PrivateRoute>},
       {path:'/learn-more',element:<LearnMore/>},
              {path:'/deals',element:<Deals/>},
{path:'/search',element:<SearchResults/>},
      { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      {path:'/feedback', element:<PrivateRoute><Feedback/></PrivateRoute>},

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
