import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const View = () => {
   const { id } = useParams();
   const [transaction, setTransaction] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchTransaction = async () => {
         try {
            const res = await axios.get(`http://localhost:3000/transactions/${id}`);
            setTransaction(res.data);
            setLoading(false);
         } catch (error) {
            console.error(error);
            toast.error("Failed to fetch transaction data");
            setLoading(false);
         }
      };

      fetchTransaction();
   }, [id]);

   if (loading) return <p className="text-center mt-10">Loading...</p>;
   if (!transaction) return <p className="text-center mt-10">Transaction not found</p>;

   return (
      <div className="flex justify-center py-12 bg-gray-100 min-h-screen">
         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-green-500 transition-transform transform hover:-translate-y-1">
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
               Transaction Details
            </h2>

            <div className="space-y-4">
               {/* Type */}
               <div className="flex justify-between items-center">
                  <span className="font-semibold">Type:</span>
                  <span className={`px-3 py-1 rounded-full font-medium text-white ${transaction.type === "Income" ? "bg-green-500" : "bg-red-500"
                     }`}>
                     {transaction.type}
                  </span>
               </div>

               {/* Category */}
               <div className="flex justify-between items-center">
                  <span className="font-semibold">Category:</span>
                  <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">
                     {transaction.category}
                  </span>
               </div>

               {/* Amount */}
               <div className="flex justify-between items-center">
                  <span className="font-semibold">Amount:</span>
                  <span className="flex items-center gap-1  px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                    <FaBangladeshiTakaSign className="text-xl" />{transaction.amount}
                  </span>
               </div>

               {/* Date */}
               <div className="flex justify-between items-center">
                  <span className="font-semibold">Date:</span>
                  <span className="text-gray-600">
                     {new Date(transaction.date).toLocaleDateString()}
                  </span>
               </div>

               {/* Description */}
               {transaction.description && (
                  <div>
                     <span className="font-semibold">Description:</span>
                     <p className="mt-1 text-gray-700 bg-gray-50 p-2 rounded-lg">{transaction.description}</p>
                  </div>
               )}

               {/* Divider */}
               <hr className="border-gray-200 my-2" />

               {/* User Info */}
               <div className="flex justify-between items-center">
                  <span className="font-semibold"> Name:</span>
                  <span className="text-gray-700">{transaction.userName}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="font-semibold"> Email:</span>
                  <span className="text-gray-700">{transaction.userEmail}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default View;
