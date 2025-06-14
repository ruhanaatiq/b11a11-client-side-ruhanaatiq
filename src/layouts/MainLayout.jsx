import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Toaster></Toaster>
      <main className="min-h-screen">
        <Outlet />
        <Footer></Footer>
      </main>
    </div>
  );
};

export default MainLayout;