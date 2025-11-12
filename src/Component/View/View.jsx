import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../Contexts/AuthContext";

// Helper function to format amount for display
const formatTaka = (amount) => {
   // Ensure amount is treated as a number and formatted nicely
   return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(Math.abs(amount)); // Use Math.abs() for clean display of totals
};
const ACCENT_HEX_COLOR = "#0891b2"; 
const LIGHT_BG = "bg-[#caf0f8]";

const View = () => {
   const { id } = useParams();
   const { user } = useContext(AuthContext);
   const [transaction, setTransaction] = useState(null);
   const [categoryTotal, setCategoryTotal] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchTransaction = async () => {
         setLoading(true);
         try {
            // 1. Fetch single transaction
             
            const res = await axios.get(`http://localhost:3000/transactions/${id}`, {
               headers: {
                  authorization: `Bearer ${user.accessToken}`,
                  
               },
            });

            const fetchedTransaction = res.data;
            setTransaction(fetchedTransaction);

            const { category, userEmail } = fetchedTransaction;

            // 2. Fetch category total
            if (category && userEmail) {
               // **NOTE: This is the backend API call that needs fixing in your Node/Express code**
               const totalRes = await axios.get(`http://localhost:3000/transactions/category-total`, {
                  params: { category, userEmail },
               });

               // The backend should return { total: number }
               setCategoryTotal(totalRes.data.total);
            }
         } catch (error) {
            console.error(" Error fetching data:", error);
            toast.error("Failed to fetch transaction data");
         } finally {
            setLoading(false);
         }
      };

      fetchTransaction();
   }, [id]);

   if (loading) return <div className={`min-h-screen flex items-center justify-center ${LIGHT_BG}`}>
      <HashLoader
         color={ACCENT_HEX_COLOR}
         size={60}
      />
   </div>;
   if (!transaction) return <p className="text-center mt-10 text-xl font-bold text-red-500">Transaction not found</p>;

   // Determine colors based on transaction type and total amount
   const isIncome = transaction.type.toLowerCase() === "income" || transaction.type.toLowerCase() === "revenue";
   const typeColor = isIncome ? "bg-green-600" : "bg-red-600";
   const typeDisplay = isIncome ? "Income" : "Expense";

   // Determine the color for the category total based on whether the total is positive or negative
   const isTotalPositive = categoryTotal >= 0;
   const totalBgColor = isTotalPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";


   return (
      <div className="flex justify-center py-12 bg-gray-50 min-h-screen">
         <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border-t-8 border-cyan-500">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 border-b pb-4">
               Transaction Summary
            </h2>

            <div className="space-y-6 text-gray-700">

               {/* Type */}
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-lg">Type:</span>
                  <span
                     className={`px-4 py-1 rounded-full text-white text-sm font-bold ${typeColor}`}
                  >
                     {typeDisplay}
                  </span>
               </div>

               {/* Category */}
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-lg">Category:</span>
                  <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                     {transaction.category}
                  </span>
               </div>

               {/* Total in Category */}
               <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <span className="font-bold text-blue-700 text-lg">
                     Total in "{transaction.category}":
                  </span>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${totalBgColor}`}>
                     <FaBangladeshiTakaSign className="text-sm" />
                     {formatTaka(categoryTotal)}
                  </span>
               </div>

               {/* Amount */}
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-lg">This Amount:</span>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                     <FaBangladeshiTakaSign className="text-sm" />
                     {formatTaka(transaction.amount)}
                  </span>
               </div>

               {/* Date */}
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-lg">Date:</span>
                  <span className="text-md font-medium">
                     {new Date(transaction.date).toLocaleDateString('en-GB')} {/* Using en-GB for DD/MM/YYYY style */}
                  </span>
               </div>

               {/* Description */}
               {transaction.description && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <span className="font-semibold block text-lg mb-1">Description:</span>
                     <p className="mt-1 bg-white p-3 border rounded text-base italic text-gray-600">
                        {transaction.description}
                     </p>
                  </div>
               )}

               {/* User Info */}
               <div className="border-t pt-4 space-y-3">
                  <p className="text-sm text-gray-500 font-semibold">Recorded By:</p>
                  <div className="flex justify-between text-sm">
                     <span className="font-medium">Name:</span>
                     <span>{transaction.userName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="font-medium">Email:</span>
                     <span>{transaction.userEmail}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default View;