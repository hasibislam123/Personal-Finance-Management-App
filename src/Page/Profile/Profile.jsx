import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2"; 
import "animate.css"; 
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      //  SweetAlert2 Success
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#6366F1", 
        background: "#ffffff",
        color: "#333",
        
      });
    } catch (err) {
      console.error(err);

      //  SweetAlert2 Error
      Swal.fire({
        title: "Oops!",
        text: "Failed to update profile.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#EF4444", 
        background: "#ffffff",
        color: "#333",
        
      });
    }
  };

  if (!user) return null; 

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#64b5f6] py-10">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

        <div className="flex flex-col items-center mb-6">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl">
              <FaUser />
            </div>
          )}
          <h3 className="mt-3 text-xl font-semibold">{user.displayName || "No Name"}</h3>
          <p className="text-sm text-gray-200">{user.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <button
            type="submit"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
