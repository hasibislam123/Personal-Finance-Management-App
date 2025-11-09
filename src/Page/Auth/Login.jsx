import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#64b5f6]">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
            required
          />

          {/*  Password field with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="px-4 py-3 w-full rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-[#03045e] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-300 text-sm mt-3 text-center">{error}</p>
        )}

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="px-3 text-gray-200 text-sm">OR</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center text-gray-200 mt-4">
          Don’t have an account?
          <Link to="/register" className="text-yellow-300 hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;