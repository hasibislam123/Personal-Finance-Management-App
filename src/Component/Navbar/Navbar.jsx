import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { FaPlusCircle, FaListAlt, FaUserCircle, FaUser } from "react-icons/fa";
import { IoLogIn, IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { AuthContext } from "../../Contexts/AuthContext";
import signin from "../../assets/sigin.svg";
import logout from "../../assets/logout.svg";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleTheme = () => {
        const newThemeState = !isDarkMode;
        setIsDarkMode(newThemeState);
        
        const html = document.documentElement;
        const themeName = newThemeState ? 'dark' : '#caf0f8';

        html.setAttribute('data-theme', themeName);
        localStorage.setItem("theme", themeName);
        html.classList.toggle('dark', newThemeState);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const renderLinks = (isMobile = false) => (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        isMobile
                            ? `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${isActive
                                ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-white"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`
                            : `relative flex items-center justify-center w-28 h-10 group ${isActive ? "border-b-2 border-white" : ""
                            }`
                    }
                >
                    <GoHomeFill
                        className={
                            isMobile
                                ? "text-xl"
                                : "text-2xl text-white transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-0"
                        }
                    />
                    <span
                        className={
                            isMobile
                                ? ""
                                : "absolute text-sm font-semibold text-white opacity-0 scale-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                        }
                    >
                        Home
                    </span>
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink
                            to="/addtransaction"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isMobile
                                    ? `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${isActive
                                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`
                                    : `relative flex items-center justify-center w-36 h-10 group ${isActive ? "border-b-2 border-white" : ""
                                    }`
                            }
                        >
                            <FaPlusCircle
                                className={
                                    isMobile
                                        ? "text-xl"
                                        : "text-2xl text-white transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-0"
                                }
                            />
                            <span
                                className={
                                    isMobile
                                        ? ""
                                        : "absolute text-sm font-semibold text-white opacity-0 scale-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                                }
                            >
                                Add Transaction
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/mytransactions"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isMobile
                                    ? `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${isActive
                                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`
                                    : `relative flex items-center justify-center w-40 h-10 group ${isActive ? "border-b-2 border-white" : ""
                                    }`
                            }
                        >
                            <FaListAlt
                                className={
                                    isMobile
                                        ? "text-xl"
                                        : "text-2xl text-white transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-0"
                                }
                            />
                            <span
                                className={
                                    isMobile
                                        ? ""
                                        : "absolute text-sm font-semibold text-white opacity-0 scale-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                                }
                            >
                                My Transactions
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/reports"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isMobile
                                    ? `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${isActive
                                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-white"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`
                                    : `relative flex items-center justify-center w-40 h-10 group ${isActive ? "border-b-2 border-white" : ""
                                    }`
                            }
                        >
                            <TbReportSearch
                                className={
                                    isMobile
                                        ? "text-xl"
                                        : "text-2xl text-white transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-0"
                                }
                            />
                            <span
                                className={
                                    isMobile
                                        ? ""
                                        : "absolute text-sm font-semibold text-white opacity-0 scale-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                                }
                            >
                                Reports
                            </span>
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-[#1e88e5]/90 shadow-lg sticky top-0 z-50 backdrop-white-lg dark:bg-gray-900 dark:text-white">
            <div className="navbar px-4 md:px-8 max-w-8xl mx-auto">
                <div className="navbar-start">
                    <button
                        onClick={toggleMenu}
                        className="btn btn-ghost btn-circle text-white lg:hidden"
                    >
                        {menuOpen ? (
                            <IoClose className="text-3xl" />
                        ) : (
                            <IoMenu className="text-3xl" />
                        )}
                    </button>

                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-wide flex items-center gap-2 ml-2 lg:ml-0"
                    >
                        Fin <span className="text-orange-400">Ease</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6 font-medium">
                        {renderLinks(false)}
                    </ul>
                </div>

                <div className="navbar-end flex items-center gap-4">
                    <button
                        onClick={handleTheme}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-500 relative ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
                    >
                        <div
                            className={`w-4 h-4 rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center ${
                                isDarkMode ? "translate-x-6 bg-yellow-400" : "bg-white"
                            }`}
                        >
                            {isDarkMode ? (
                                <BsMoonStarsFill className="text-xs text-gray-800" />
                            ) : (
                                <BsSunFill className="text-xs text-yellow-500" />
                            )}
                        </div>
                    </button>

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

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 text-gray-700 z-[1] bg-white dark:bg-gray-800 dark:text-gray-100"
                            >
                                <li className="border-b dark:border-gray-600 pb-2 mb-2">
                                    <p className="font-semibold">{user.displayName || "User"}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        <FaUser /> Profile
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <button
                                        onClick={logOut}
                                        className="flex items-center gap-2 text-red-500 font-semibold bg-red-200 hover:bg-red-300 dark:bg-red-900/50 dark:hover:bg-red-900 dark:text-red-400 w-full px-2 py-1 rounded-lg"
                                    >
                                        <IoLogOut className="text-xl" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden lg:flex bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 dark:bg-green-600 dark:text-white dark:hover:bg-green-500 transition items-center gap-2"
                        >
                            <img className="h-8 w-12" src={signin} alt="" /> Sign In
                        </Link>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="lg:hidden shadow-md absolute w-full left-0 top-[64px] z-40 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100">
                    <ul className="flex flex-col gap-1 p-3">{renderLinks(true)}</ul>
                    <div className="p-3 border-t dark:border-gray-700">
                        {user ? (
                            <button
                                onClick={() => {
                                    logOut();
                                    closeMenu();
                                }}
                                className="flex items-center gap-2 text-red-500 font-semibold bg-red-200 hover:bg-red-300 dark:bg-red-900/50 dark:hover:bg-red-900 dark:text-red-400 w-full px-2 py-2 rounded-md"
                            >
                                <img className="h-8 w-12" src={logout} alt="" /> Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="flex items-center gap-2 text-green-600 font-semibold bg-green-200 hover:bg-green-300 dark:bg-green-900/50 dark:hover:bg-green-900 dark:text-green-400 w-full px-2 py-2 rounded-md"
                            >
                                <IoLogIn className="text-xl" /> Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;