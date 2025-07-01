import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().catch((error) => console.error(error));
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
    } hover:text-blue-800`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-cars" className={navLinkClass}>Available Cars</NavLink>
      </li>

      {!user && (
        <li>
          <NavLink to="/login" className={navLinkClass}>Log In</NavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink to="/add-car" className={navLinkClass}>Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/my-cars" className={navLinkClass}>My Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="px-3 py-2 text-red-500 hover:text-red-700">
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      {/* Mobile Drawer Wrapper */}
      <div className="drawer md:hidden">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span>DriveNow</span>
          </Link>

          {/* Hamburger Icon */}
          <label htmlFor="nav-drawer" className="btn btn-ghost bg-blue-600 ml-4 btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side z-50">
          <label htmlFor="nav-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content space-y-2">
            {/* Logo inside drawer */}
            <li className="mb-4">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
                <img src={logo} alt="Logo" className="h-8 w-8" />
                <span>DriveNow</span>
              </Link>
            </li>
            {navItems}
            {user && (
              <li className="mt-4">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL} className="h-8 w-8 rounded-full" />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span>DriveNow</span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-4 text-gray-700 font-medium">{navItems}</ul>

        {/* Profile */}
        {user && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="h-8 w-8 rounded-full"
            title={user.displayName || user.email}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
