import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import "animate.css";
import { FaUser } from "react-icons/fa";
import { HashLoader } from "react-spinners";

const Profile = () => {
   const { user } = useContext(AuthContext);
   const [name, setName] = useState("");
   const [photo, setPhoto] = useState("");
   const [loading, setLoading] = useState(false);

   const ACCENT_HEX_COLOR = "#0496ff";

   useEffect(() => {
      if (user) {
         setName(user.displayName || "");
         setPhoto(user.photoURL || "");
      }
   }, [user]);

   const handleUpdate = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await updateProfile(user, {
            displayName: name,
            photoURL: photo,
         });

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

         Swal.fire({
            title: "Oops!",
            text: "Failed to update profile.",
            icon: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#EF4444",
            background: "#ffffff",
            color: "#333",
         });
      } finally {
         setLoading(false);
      }
   };

   if (!user) return null;

   return (
      <div className="min-h-screen flex justify-center items-center bg-[#caf0f8] py-10">
         <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-black">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">My Profile</h2>

            {loading ? (
               <div className="flex justify-center items-center h-64">
                  <HashLoader color={ACCENT_HEX_COLOR} size={60} />
               </div>
            ) : (
               <>
                  <div className="flex flex-col items-center mb-6">
                     {user.photoURL ? (
                        <img
                           src={user.photoURL}
                           alt="Profile"
                           className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        />
                     ) : (
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl text-gray-700">
                           <FaUser />
                        </div>
                     )}
                     <h3 className="mt-3 text-xl font-semibold text-gray-800">{user.displayName || "No Name"}</h3>
                     <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                     <input
                        type="text"
                        placeholder="Full Name"
                        className="px-4 py-3 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                     <input
                        type="text"
                        placeholder="Photo URL"
                        className="px-4 py-3 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                     />

                     <button
                        type="submit"
                        disabled={loading}
                        className="group w-full rounded-2xl bg-gradient-to-br from-[#ccff33] via-[#9ef01a] to-[#70e000]
      hover:from-[#38b000] hover:via-green-700 hover:to-green-600 
      p-1 transition ease-in-out transform hover:scale-105 hover:rotate-1 hover:brightness-125 
      hover:shadow-lg hover:shadow-green-700/50 disabled:opacity-50"
                     >
                        <div className="px-6 py-2 backdrop-blur-xl bg-black/20 rounded-xl font-semibold w-full h-full flex justify-center items-center gap-2 text-white">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              className="w-6 h-6 stroke-white group-hover:stroke-green-200"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M5 13l4 4L19 7"
                              />
                           </svg>
                           Update Profile
                        </div>
                     </button>
                  </form>
               </>
            )}
         </div>
      </div>
   );
};

export default Profile;
