import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineCategory, MdOutlineCalendarToday, MdOutlineDelete, MdOutlineEdit, MdOutlineVisibility } from "react-icons/md";
import { HashLoader } from "react-spinners"; 
import nofolder from "../../assets/nofolder.svg"; 

const ACCENT_COLOR = "text-cyan-600";
const ACCENT_HEX_COLOR = "#0891b2"; 
const LIGHT_BG = "bg-[#caf0f8]";
const LIGHT_BG_TEXT = "text-gray-900";

const MyTransactions = () => {
    const { user, authLoading } = useContext(AuthContext); 
    const [transactions, setTransactions] = useState([]);
    const [pageLoading, setPageLoading] = useState(true); 
    const navigate = useNavigate();

    // Fetch transactions with token
    const fetchTransactions = async () => {
        if (user?.email) {
            setPageLoading(true);
            try {
                const token = await user.getIdToken(); // Firebase token
                const res = await axios.get(
                    `http://localhost:3000/transactions?email=${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTransactions(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch transactions");
            } finally {
                setPageLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!authLoading) {
            if (user?.email) {
                fetchTransactions();
            } else {
                setPageLoading(false);
            }
        }
    }, [user, authLoading]);

    // Delete transaction
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This transaction will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00BFA5", 
            cancelButtonColor: "#FF6B6B", 
            confirmButtonText: "Yes, delete it!",
            background: '#FFFFFF', 
            color: '#333333' 
        });

        if (confirm.isConfirmed) {
            try {
                const token = await user.getIdToken();
                const res = await axios.delete(
                    `http://localhost:3000/transactions/${id}?userEmail=${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data.deletedCount > 0) {
                    fetchTransactions(); 
                    toast.success("Transaction deleted successfully!");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete transaction");
            }
        }
    };

    const handleView = (id) => {
        navigate(`/transactions/${id}`);
    };

    const handleUpdate = (id) => {
        navigate(`/updatetransaction/${id}`);
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', { 
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (authLoading || pageLoading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${LIGHT_BG}`}>
                <HashLoader 
                    color={ACCENT_HEX_COLOR} 
                    size={60} 
                />
            </div>
        );
    }

    return (
        <div className={`min-h-screen  py-12 px-4 sm:px-6 lg:px-8 ${LIGHT_BG_TEXT}`}>
             <Toaster position="top-right" />
            <h2 className={`text-3xl sm:text-4xl md:text-5xl ${ACCENT_COLOR} font-extrabold text-center mb-10 tracking-wider`}>
                My Transactions 
            </h2>

            {transactions.length === 0 ? (
                <div className="grid items-center justify-center mt-10">
                    <img className="h-50 w-50" src={nofolder} alt="No transactions" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {transactions.map((t) => (
                        <div
                            key={t._id}
                            className={`relative overflow-hidden rounded-2xl p-6 
                                border border-opacity-40 backdrop-blur-sm transition-all duration-500 hover:scale-[1.03]
                                shadow-lg hover:shadow-cyan-500/30 
                                bg-white 
                                ${t.type === "Income"
                                    ? "border-green-500/50"
                                    : "border-red-500/50"
                                }`}
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 ${t.type === "Income" ? "bg-green-600" : "bg-red-600"}`}></div>

                            <div className={`${LIGHT_BG_TEXT} space-y-4`}> 
                                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                                    <span
                                        className={`px-3 py-0.5 text-xs font-bold rounded-full tracking-wider uppercase
                                            ${t.type === "Income"
                                                ? "bg-green-500 text-gray-900"
                                                : "bg-red-500 text-gray-900"
                                            }`}
                                    >
                                        {t.type}
                                    </span>
                                    <span className="text-gray-500 text-sm flex items-center gap-1">
                                        <MdOutlineCalendarToday className="text-xs" />
                                        {new Date(t.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-light text-gray-600 flex items-center gap-1">
                                        <MdOutlineCategory className={ACCENT_COLOR} /> {t.category}
                                    </p>
                                    <p className="text-lg font-semibold mt-1">
                                        <span className="text-sm font-light text-gray-500 block">{t.userName}</span>
                                        
                                        <span
                                            className={`text-3xl font-extrabold flex items-center gap-1 mt-1 
                                                ${t.type === "Income" ? "text-green-700" : "text-red-700"}`}
                                        >
                                            <FaBangladeshiTakaSign className="text-2xl" /> 
                                            {formatAmount(t.amount)}
                                        </span>
                                    </p>
                                </div>
                                
                                {t.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2 pt-2 border-t border-gray-300">
                                        {t.description}
                                    </p>
                                )}

                                <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
                                    <button
                                        onClick={() => handleUpdate(t._id)}
                                        type="button" 
                                        className="flex items-center justify-center w-full gap-1 bg-cyan-100 text-cyan-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-cyan-500 hover:text-white transition duration-300"
                                    >
                                        <MdOutlineEdit /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleView(t._id)}
                                        type="button" 
                                        className="flex items-center justify-center w-full gap-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-gray-400 transition duration-300"
                                    >
                                        <MdOutlineVisibility /> View
                                    </button>

                                    <button
                                        onClick={() => handleDelete(t._id)}
                                        type="button" 
                                        className="flex items-center justify-center w-full gap-1 bg-red-100 text-red-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                                    >
                                        <MdOutlineDelete /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTransactions;
