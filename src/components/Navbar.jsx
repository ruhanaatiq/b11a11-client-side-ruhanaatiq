import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        // Successfully logged out
      })
      .catch((error) => console.error(error));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="px-3 py-2">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-cars" className="px-3 py-2">Available Cars</NavLink>
      </li>

      {!user && (
        <li>
          <NavLink to="/login" className="px-3 py-2">Log In</NavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink to="/add-car" className="px-3 py-2">Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/my-cars" className="px-3 py-2">My Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" className="px-3 py-2">My Bookings</NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="px-3 py-2 text-red-500 hover:text-red-700">Logout</button>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <img src="https://i.ibb.co/tPwbDVX9/logo.jpg" alt="Logo" className="h-8 w-8" />
          <span>DriveNow</span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-4 text-gray-700 font-medium">
          {navItems}
        </ul>

        {/* Optional: User Profile Image */}
        {user && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="h-8 w-8 rounded-full ml-4"
            title={user.displayName || user.email}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
