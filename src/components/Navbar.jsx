// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useCallback, useEffect, useMemo } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // ---- helpers
  const closeDrawer = useCallback(() => {
    const drawer = document.getElementById("nav-drawer");
    if (drawer && "checked" in drawer) drawer.checked = false;
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    try {
      setLoggingOut(true);
      await logout();
      localStorage.removeItem("access-token");
      closeDrawer();
      navigate("/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  // Sticky shadow + frosted transition when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link styling with animated underline
  const navLinkClass = useCallback(
    ({ isActive }) =>
      [
        "relative px-3 py-2 rounded-md transition",
        "text-sm md:text-[15px]",
        isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-700",
        "after:absolute after:left-3 after:-bottom-0.5 after:h-0.5 after:rounded-full",
        isActive ? "after:w-6 after:bg-blue-600" : "after:w-0 after:bg-transparent",
        "after:transition-all after:duration-300",
      ].join(" "),
    []
  );

  const DesktopNavItems = useMemo(
    () => (
      <>
        <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
        <li><NavLink to="/available-cars" className={navLinkClass}>Available Cars</NavLink></li>

        {!user && <li><NavLink to="/login" className={navLinkClass}>Log In</NavLink></li>}

        {user && (
          <>
            <li><NavLink to="/add-car" className={navLinkClass}>Add Car</NavLink></li>
            <li><NavLink to="/my-cars" className={navLinkClass}>My Cars</NavLink></li>
            <li><NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink></li>
            <li><NavLink to="/deals" className={navLinkClass}>Deals</NavLink></li>
            <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
            <li><NavLink to="/feedback" className={navLinkClass}>Feedback</NavLink></li>
          </>
        )}
      </>
    ),
    [navLinkClass, user]
  );

  return (
    <>
      {/* Skip link for screen readers */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <div
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-md"
            : "bg-white",
        ].join(" ")}
        role="banner"
        aria-label="Primary navigation"
      >
        {/* Mobile Header */}
        <div className="drawer md:hidden">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:opacity-90 transition"
            >
              <img src={logo} alt="DriveNow logo" className="h-8 w-8" />
              <span className="tracking-tight">DriveNow</span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <label
                htmlFor="nav-drawer"
                className="btn btn-ghost btn-circle bg-blue-600 text-white hover:bg-blue-700"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>
          </div>

          {/* Mobile Drawer */}
          <div className="drawer-side z-50">
            <label htmlFor="nav-drawer" className="drawer-overlay" aria-label="Close menu" />
            <ul
              className="menu p-4 w-72 min-h-full bg-base-100 text-base-content space-y-1"
              onClick={(e) => {
                // Close on any <a> click; keep open for Logout button
                const link = e.target.closest("a");
                const isLogoutBtn = e.target.closest("button[data-logout]");
                if (link && !isLogoutBtn) closeDrawer();
              }}
            >
              <li className="mb-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xl font-bold text-blue-600"
                  onClick={closeDrawer}
                >
                  <img src={logo} alt="DriveNow logo" className="h-8 w-8" />
                  <span>DriveNow</span>
                </Link>
              </li>

              <li className="mb-2"><ThemeToggle /></li>

              {/* Mobile nav items (duplicated for simplicity to avoid React.* APIs) */}
              <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/available-cars" className={navLinkClass}>Available Cars</NavLink></li>

              {!user && <li><NavLink to="/login" className={navLinkClass}>Log In</NavLink></li>}

              {user && (
                <>
                  <li><NavLink to="/add-car" className={navLinkClass}>Add Car</NavLink></li>
                  <li><NavLink to="/my-cars" className={navLinkClass}>My Cars</NavLink></li>
                  <li><NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink></li>
                  <li><NavLink to="/deals" className={navLinkClass}>Deals</NavLink></li>
                  <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
                  <li><NavLink to="/feedback" className={navLinkClass}>Feedback</NavLink></li>

                  <li className="mt-2">
                    <button
                      type="button"
                      data-logout
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`btn btn-error btn-sm text-white ${loggingOut ? "pointer-events-none opacity-70" : ""}`}
                    >
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </li>

                  <li className="mt-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.photoURL || "/avatar.png"}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm">{user.displayName || user.email}</span>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-[1.02]"
          >
            <img src={logo} alt="DriveNow logo" className="h-8 w-8" />
            <span className="tracking-tight">DriveNow</span>
            <span className="ml-1 hidden lg:inline-block text-[10px] font-semibold uppercase text-blue-700/70 bg-blue-100 rounded-full px-2 py-0.5">
              Beta
            </span>
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-1 text-gray-700 font-medium">
            {DesktopNavItems}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 rounded-full ring-2 ring-blue-100">
                    <img
                      src={user.photoURL || "/avatar.png"}
                      alt={user.displayName || user.email}
                      title={user.displayName || user.email}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
                >
                  <li className="px-2 py-1">
                    <div className="text-sm font-semibold truncate">
                      {user.displayName || user.email}
                    </div>
                    <div className="text-xs opacity-60">Logged in</div>
                  </li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/my-bookings">My Bookings</Link></li>
                  <li><Link to="/feedback">Feedback</Link></li>
                  <li className="mt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`btn btn-error btn-sm text-white ${loggingOut ? "pointer-events-none opacity-70" : ""}`}
                    >
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
