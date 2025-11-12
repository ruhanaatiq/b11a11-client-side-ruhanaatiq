// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220] text-white overflow-hidden">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="Car Rental Hub Logo" className="w-16 h-16 mb-3" />
          <h2 className="text-2xl font-bold mb-2">Car Rental Hub</h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Drive your dreams with ease — premium cars, affordable prices, and seamless booking.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/available-cars" className="hover:text-blue-400 transition">Available Cars</a></li>
            <li><a href="/deals" className="hover:text-blue-400 transition">Deals & Offers</a></li>
            <li><a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a></li>
            <li><a href="/feedback" className="hover:text-blue-400 transition">Feedback</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">Support</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
            <li><a href="/faqs" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">Connect With Us</h3>
          <div className="flex gap-4 text-xl mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-sm text-white/60">
            &copy; {year} <span className="font-medium">Car Rental Hub</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom accent gradient */}
      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
    </footer>
  );
};

export default Footer;
