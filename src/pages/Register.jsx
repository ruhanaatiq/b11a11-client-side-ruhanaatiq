import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL }).then(() => {
          toast.success("Registered successfully!");
          navigate("/");
        });
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then(() => {
        toast.success("Signed up with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" required placeholder="Full Name" className="input input-bordered w-full mb-4" />
          <input type="text" name="photoURL" placeholder="Photo URL (optional)" className="input input-bordered w-full mb-4" />
          <input type="email" name="email" required placeholder="Email" className="input input-bordered w-full mb-4" />
          <input type="password" name="password" required placeholder="Password" className="input input-bordered w-full mb-4" />
          <button type="submit" className="btn bg-orange-500 w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
       <button onClick={handleGoogleRegister} className="btn btn-outline bg-blue-400 w-full mt-3">
  <FcGoogle className="w-5 h-5 mr-2" />
  Continue with Google
</button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
