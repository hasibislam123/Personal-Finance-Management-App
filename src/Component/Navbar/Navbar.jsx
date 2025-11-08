import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { FaPlusCircle, FaListAlt, FaPenFancy, FaUser, FaUserCircle } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { AuthContext } from "../../Contexts/AuthContext";

const Navbar = () => {
   const { user, logOut } = useContext(AuthContext);

   // Links for everyone
   const publicLinks = (
      // Home
      <li>
         <NavLink
            to="/"
            className="relative flex items-center justify-center w-28 h-10 group"
         >
            {/* Icon (default visible) */}
            <GoHomeFill
               className="text-2xl text-white transition-all duration-500 ease-in-out
                 group-hover:opacity-0 group-hover:scale-0"
            />

            {/* Text (hidden by default, appears on hover) */}
            <span
               className="absolute text-sm font-semibold text-white opacity-0 scale-0
                 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
            >
               Home
            </span>
         </NavLink>
      </li>
   );

   // Links only for logged-in users Add Transaction
   const privateLinks = user ? (
      <>
         {/*  addtransaction*/}
         <li>
            <NavLink
               to="/addtransaction"
               className="relative flex items-center justify-center w-36 h-10 group"
            >
               {/* Icon (default visible) */}
               <FaPlusCircle
                  className="text-2xl text-white transition-all duration-500 ease-in-out
                 group-hover:opacity-0 group-hover:scale-0"
               />
               {/* Text (hidden by default, appears on hover) */}
               <span
                  className="absolute text-sm font-semibold text-white opacity-0 scale-0
                 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
               >
                  Add Transaction
               </span>
            </NavLink>
         </li>
         {/*mytransactions  */}
         <li>
            <NavLink
               to="/mytransactions"
               className="relative flex items-center justify-center w-40 h-10 group"
            >
               <FaListAlt
                  className="text-2xl text-white transition-all duration-500 ease-in-out
                 group-hover:opacity-0 group-hover:scale-0"
               />
               <span
                  className="absolute text-sm font-semibold text-white opacity-0 scale-0
                 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
               >
                  My Transactions
               </span>
            </NavLink>
         </li>
         {/* updatetransaction */}
         <li>
            <NavLink
               to="/updatetransaction"
               className="relative flex items-center justify-center w-44 h-10 group"
            >
               {/* Icon (default visible) */}
               <FaPenFancy
                  className="text-2xl text-white transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                 group-hover:opacity-0 group-hover:scale-0"
               />

               {/* Text (hidden by default, appears on hover) */}
               <span
                  className="absolute text-sm font-semibold text-white opacity-0 scale-0
                 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                 group-hover:opacity-100 group-hover:scale-100"
               >
                  Update Transaction
               </span>
            </NavLink>
         </li>
      </>
   ) : null;

   return (
      <div className="bg-[#1e88e5]/90 shadow-lg sticky top-0 z-50 backdrop-white-lg">
         <div className="navbar text-white px-4 md:px-8 max-w-8xl mx-auto">
            {/* Left - Logo */}
            <div className="navbar-start">
               <Link to="/" className="text-2xl font-bold tracking-wide flex items-center gap-2">
                  Fin <span className="text-orange-400">Ease</span>
               </Link>
            </div>

            {/* Center - Menu Links (Desktop) */}
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal px-1 gap-6 text-white font-medium">
                  {publicLinks}
                  {privateLinks}
               </ul>
            </div>

            {/* Right - User / Login */}
            <div className="navbar-end">
               {user ? (
                  <div className="dropdown dropdown-end">
                     <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border-2 border-white flex items-center justify-center bg-white/10">
                           {user.photoURL ? (
                              <img
                                 alt="User Avatar"
                                 src={user.photoURL}
                                 referrerPolicy="no-referrer"
                                 className="rounded-full"
                              />
                           ) : (
                              <FaUserCircle className="text-white text-3xl" />
                           )}
                        </div>
                     </div>

                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-gray-700">
                        <li className="border-b pb-2 mb-2">
                           <p className="font-semibold">{user.displayName || "User"}</p>
                           <p className="text-xs text-gray-500">{user.email}</p>
                        </li>
                        <li>
                           <Link to="/profile" className="flex items-center gap-2">
                              <FaUser /> Profile
                           </Link>
                        </li>
                        <li>
                           <button
                              onClick={logOut}
                              className="flex items-center gap-2 text-red-500 font-semibold hover:bg-red-50 w-full px-2 py-1 rounded"
                           >
                              <IoLogOut /> Logout
                           </button>
                        </li>
                     </ul>
                  </div>
               ) : (
                  <Link
                     to="/login"
                     className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
                  >
                     <IoLogIn /> Sign In
                  </Link>
               )}
            </div>
         </div>

         {/* Mobile Menu */}
         <div className="lg:hidden bg-white/10 backdrop-blur-md text-white py-2 flex justify-center">
            <ul className="menu menu-horizontal gap-4 text-sm">
               {publicLinks}
               {privateLinks}
            </ul>
         </div>
      </div>
   );
};

export default Navbar;
