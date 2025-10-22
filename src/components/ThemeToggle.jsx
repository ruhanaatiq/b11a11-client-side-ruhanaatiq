import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-light btn-sm"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* sun / moon swap */}
      <svg
        className={`h-5 w-5 ${theme === "dark" ? "hidden" : ""}`}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      >
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-8a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm13.657 6.657a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM8.464 7.05A1 1 0 1 1 7.05 8.464l-.707-.707A1 1 0 0 1 7.757 6.343l.707.707Zm8.486-1.414a1 1 0 0 1 0 1.414l-.707.707A1 1 0 1 1 14.829 6.343l.707-.707a1 1 0 0 1 1.414 0ZM6.343 16.243a1 1 0 0 1 0 1.414l-.707.707A1 1 0 1 1 4.222 16.95l.707-.707a1 1 0 0 1 1.414 0Z"/>
      </svg>

      <svg
        className={`h-5 w-5 ${theme === "dark" ? "" : "hidden"}`}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
      </svg>
    </button>
  );
}
