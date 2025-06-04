import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc';
import axios from "axios";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const fetchJWTToken = async (email) => {
    try {
      const response = await axios.post("http://localhost:3000/jwt", { email });
      const token = response.data.token;
      localStorage.setItem("access-token", token); // ✅ Store token
    } catch (error) {
      console.error("JWT fetch failed:", error);
      toast.error("Could not retrieve access token");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);

    try {
      await loginUser(email, password);
      toast.success("Login successful!");

      // ✅ Get JWT from backend and store
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
      const user = result.user;
      toast.success("Logged in with Google!");

      // ✅ Get JWT using Google user email
      await fetchJWTToken(user.email);

      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Login Here!</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" required placeholder="Email" className="input input-bordered w-full mb-4" />
          <input type="password" name="password" required placeholder="Password" className="input input-bordered w-full mb-4" />
          <button type="submit" className="btn bg-orange-500 w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="btn btn-outline bg-blue-400 w-full mt-3">
          <FcGoogle className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 font-medium font-extrabold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
