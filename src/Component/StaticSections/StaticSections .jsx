import React from "react";

const StaticSections = () => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
         {/* Budgeting Tips Section */}
         <div className="bg-blue-100 text-blue-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Budgeting Tips</h2>
            <ul className="list-disc list-inside space-y-2">
               <li>Track your spending every month.</li>
               <li>Set realistic budgets for essentials and leisure.</li>
               <li>Save a portion of your income first before spending.</li>
               <li>Use apps or spreadsheets to monitor expenses.</li>
            </ul>
         </div>

         {/* Why Financial Planning Matters Section */}
         <div className="bg-yellow-100 text-yellow-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Why Financial Planning Matters</h2>
            <p>
               Financial planning helps you achieve long-term goals, reduces money-related stress,
               and prepares you for emergencies. Planning ahead ensures your money works efficiently for you.
            </p>
         </div>
      </div>
   );
};

export default StaticSections;