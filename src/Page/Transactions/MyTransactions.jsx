import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MyTransactions = () => {
   const { user } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const navigate = useNavigate();

   //  Fetch only the logged-in user's transactions
   useEffect(() => {
      if (user?.email) {
         axios
            .get(`http://localhost:3000/transactions?email=${user.email}`)
            .then((res) => setTransactions(res.data))
            .catch(() => toast.error("Failed to fetch transactions"));
      }
   }, [user]);

   const handleDelete = async (id) => {
      const confirm = await Swal.fire({
         title: "Are you sure?",
         text: "This transaction will be deleted permanently!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
         try {
            // Send userEmail as query param
            const res = await axios.delete(
               `http://localhost:3000/transactions/${id}?userEmail=${user.email}`
            );
            if (res.data.deletedCount > 0) {
               setTransactions(transactions.filter((t) => t._id !== id));
               toast.success("Transaction deleted successfully!");
            }
         } catch (error) {
            console.error(error);
            toast.error("Failed to delete transaction");
         }
      }
   };

   //  View Details
   const handleView = (id) => {
      navigate(`/transactions/${id}`); 
   };

   //  Update Transaction
   const handleUpdate = (id) => {
      navigate(`/updatetransaction/${id}`);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-5">
         <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-wide">
            My Transactions
         </h2>

         {transactions.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
               No transactions found yet.
            </p>
         ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {transactions.map((t) => (
                  <div
                     key={t._id}
                     className={`relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-lg 
              transition-all duration-500 border border-gray-200 hover:scale-[1.02]
              ${t.type === "Income"
                           ? "bg-gradient-to-br from-green-50 via-white to-green-100"
                           : "bg-gradient-to-br from-red-50 via-white to-red-100"
                        }`}
                  >
                     {/* Top Ribbon */}
                     <div
                        className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl ${t.type === "Income" ? "bg-green-500" : "bg-red-500"
                           }`}
                     ></div>

                     {/* Card Content */}
                     <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-3">
                           <span
                              className={`px-4 py-1 text-xs font-semibold rounded-full ${t.type === "Income"
                                 ? "bg-green-100 text-green-700"
                                 : "bg-red-100 text-red-700"
                                 }`}
                           >
                              {t.type}
                           </span>
                           <span className="text-gray-500 text-sm">
                              {new Date(t.date).toLocaleDateString()}
                           </span>
                        </div>

                        {/* Category  */}
                        <div className="flex justify-between">
                           <h3 className="text-xl font-semibold text-gray-800 mb-1 tracking-tight">
                              {t.category}
                           </h3>
                           {/* userName */}
                           <h1 className="text-lg  text-gray-800 mb-1 tracking-tight">
                              {t.userName}
                           </h1>
                        </div>
                        {/* amount */}
                        <p
                           className={`text-2xl font-bold ${t.type === "Income" ? "text-green-600" : "text-red-600"
                              }`}
                        >
                           <span className="flex"> <FaBangladeshiTakaSign className="text-2xl font-bold items-center" /> {t.amount} </span>
                        </p>

                        {/* Description */}
                        {t.description && (
                           <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                              {t.description}
                           </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-between mt-6">
                           <button
                              onClick={() => handleUpdate(t._id)}
                              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition"
                           >
                              <i className="fa-solid fa-pen-to-square"></i> Update
                           </button>

                           <button
                              onClick={() => handleView(t._id)}
                              className="flex items-center gap-1 bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
                           >
                              <i className="fa-solid fa-eye"></i> View
                           </button>

                           <button
                              onClick={() => handleDelete(t._id)}
                              className="flex items-center gap-1 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                           >
                              <i className="fa-solid fa-trash"></i> Delete
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
