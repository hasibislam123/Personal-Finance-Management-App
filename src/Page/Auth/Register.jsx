import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import toast from "react-hot-toast";
import signup from '../../assets/signup.svg'

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    try {
      const result = await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      //  Update AuthContext state
      setUser({
        ...result.user,
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Registration successful! ");
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Registration failed!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await googleSignIn();

      //  Update AuthContext state
      setUser(googleUser.user);

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Google Sign-in failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#64b5f6]">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create an Account
          <img src={signup} alt="" />
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL (optional)"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="px-4 py-3 w-full rounded-lg bg-white/20 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
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
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-red-300 text-sm mt-2 text-center">{error}</p>
        )}

        <p className="text-center text-gray-200 mt-4">
          Already have an account?
          <Link to="/login" className="text-yellow-300 hover:underline ml-1">
            Login
          </Link>
        </p>

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
      </div>
    </div>
  );
};

export default Register;
