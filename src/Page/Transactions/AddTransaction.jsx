import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext";
import addpost from '../../assets/add-post.svg';

const BG_COLOR = "bg-[#caf0f8]";
const ACCENT_COLOR = "text-cyan-600";
const TEXT_COLOR = "text-gray-900";

const AddTransaction = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        type: "Income",
        category: "",
        amount: "",
        description: "",
        date: "",
    });

    const notify = (message, type = "success") => {
        toast[type](message, { duration: 3000, position: "top-right" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category || !formData.amount || !formData.date) {
            return notify("Please fill all required fields", "error");
        }

        const transactionData = {
            ...formData,
            userEmail: user?.email,
            userName: user?.displayName || "Unknown User",
        };

        try {
            // Get Firebase token
            const token = await user.getIdToken();

            const res = await axios.post(
                "http://localhost:3000/transactions",
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- Send token to backend
                    },
                }
            );

            if (res.data.insertedId) {
                notify("Transaction added successfully!");

                setFormData({
                    type: "Income",
                    category: "",
                    amount: "",
                    description: "",
                    date: "",
                });
            }
        } catch (error) {
            console.error(error);
            notify("Failed to add transaction", "error");
        }
    };

    return (
        <div className={`xl:py-6 flex justify-center items-center min-h-screen  ${TEXT_COLOR}`}>
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md" 
            >
                <h2 className={`text-3xl ${ACCENT_COLOR} font-bold text-center mb-6`}> 
                    Add Transaction
                    <img className="h-40 w-70 mx-auto" src={addpost} alt="" />
                </h2>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150 bg-white"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150 bg-white"
                    >
                        <option value="">Select Category</option>
                        {formData.type === "Income" ? (
                            <>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Bonus">Bonus</option>
                            </>
                        ) : (
                            <>
                                <option value="Food">Food</option>
                                <option value="Rent">Rent</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Travel">Travel</option>
                            </>
                        )}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150"
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150"
                        placeholder="Enter description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150 bg-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-gray-700">User Email</label>
                    <input
                        type="text"
                        value={user?.email || ""}
                        readOnly
                        className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-1 text-gray-700">User Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="group w-full rounded-2xl bg-gradient-to-br from-[#ccff33] via-[#9ef01a] to-[#70e000]
                      hover:from-[#38b000] hover:via-green-700 hover:to-green-600 
                      p-1 transition ease-in-out transform hover:scale-105 hover:rotate-1 hover:brightness-125 
                      hover:shadow-lg hover:shadow-green-700/50"
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Transaction
                    </div>
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
