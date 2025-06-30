import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Logo + Site Name */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-xl font-bold">Car Rental Hub</h2>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Car Rental Hub. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-4 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
