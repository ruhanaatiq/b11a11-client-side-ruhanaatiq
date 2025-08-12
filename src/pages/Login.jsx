import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const fetchJWTToken = async (email) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });
      localStorage.setItem("access-token", res.data.token);
    } catch (error) {
      console.error("JWT fetch failed:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      await fetchJWTToken(email);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      toast.success("Logged in with Google!");
      await fetchJWTToken(result.user.email);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white rounded shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Illustration (visible ≥ md) */}
        <div className="hidden md:flex w-1/2 bg-orange-50 items-center justify-center p-6">
          <img
            src="https://i.ibb.co/rfyWjsVt/27572982-Man-looking-through-loupe-at-car-route-on-mobile-map-app.jpg"
            alt="Login illustration"
            className="max-w-sm w-full"
            loading="lazy"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Login Here!</h2>
          <form onSubmit={handleLogin}>
            <input type="email" name="email" required placeholder="Email" className="input input-bordered w-full mb-4" />
            <input type="password" name="password" required placeholder="Password" className="input input-bordered w-full mb-4" />
            <button type="submit" className="btn bg-orange-500 w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <button onClick={handleGoogleLogin} className="btn btn-outline bg-blue-400 w-full mt-3" disabled={loading}>
            <FcGoogle className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-500 font-extrabold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
