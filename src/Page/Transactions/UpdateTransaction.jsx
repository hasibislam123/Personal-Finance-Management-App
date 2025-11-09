import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext";

const UpdateTransaction = () => {
  const { id } = useParams(); // Transaction ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    type: "Income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing transaction data
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/transactions/${id}`)
      .then((res) => {
        const transaction = res.data;
        // Only allow if the transaction belongs to logged-in user
        if (transaction.userEmail !== user.email) {
          toast.error("You are not authorized to edit this transaction");
          navigate("/mytransactions");
          return;
        }
        const { type, category, amount, description, date } = transaction;
        setFormData({ type, category, amount, description, date });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch transaction data");
      });
  }, [id, user, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) {
      return toast.error("Please fill all required fields");
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/transactions/${id}`,
        { ...formData, userEmail: user.email } // Ensure userEmail stays correct
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Transaction updated successfully!");
        navigate(`/transactions/${id}`); // Go to details page
      } else {
        toast.error("No changes were made");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update transaction");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Transaction
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
        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
