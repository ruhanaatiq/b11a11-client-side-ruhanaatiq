import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import CustomerReviews from '../components/CustomerReviews';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Toaster></Toaster>
      <main className="min-h-screen">
        <Outlet />
        <CustomerReviews></CustomerReviews>
        <Footer></Footer>
      </main>
    </div>
  );
};

export default MainLayout;