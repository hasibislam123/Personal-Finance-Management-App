import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext";

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

      // Validation
      if (!formData.category || !formData.amount || !formData.date) {
         return notify("Please fill all required fields", "error");
      }

      const transactionData = {
         ...formData,
         userEmail: user?.email,
         userName: user?.displayName || "Unknown User",
      };

      try {
         const res = await axios.post(
            "http://localhost:3000/transactions",
            transactionData
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <Toaster />
         <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
         >
            <h2 className="text-2xl font-semibold text-center mb-6">
               Add Transaction
            </h2>

            {/* Type */}
            <div className="mb-4">
               <label className="block font-medium mb-1">Type</label>
               <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
               >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
               </select>
            </div>

            {/* Category */}
            <div className="mb-4">
               <label className="block font-medium mb-1">Category</label>
               <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
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

            {/* Amount */}
            <div className="mb-4">
               <label className="block font-medium mb-1">Amount</label>
               <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="Enter amount"
                  required
               />
            </div>

            {/* Description */}
            <div className="mb-4">
               <label className="block font-medium mb-1">Description</label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="Enter description"
               />
            </div>

            {/* Date */}
            <div className="mb-4">
               <label className="block font-medium mb-1">Date</label>
               <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
               />
            </div>

            {/* Read-only fields */}
            <div className="mb-4">
               <label className="block font-medium mb-1">User Email</label>
               <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
               />
            </div>

            <div className="mb-6">
               <label className="block font-medium mb-1">User Name</label>
               <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
               />
            </div>

            <button
               type="submit"
               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
               Add Transaction
            </button>
         </form>
      </div>
   );
};

export default AddTransaction;
