import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/axiosInstance";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customer/allcustomers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add or edit customers");
      return;
    }

    try {
      if (editingId) {
        await axiosInstance.put(`/customer/update/${editingId}`, {
          name,
          email,
          phone,
          company,
        });
        setEditingId(null);
      } else {
        await axiosInstance.post("/customer/create", {
          name,
          email,
          phone,
          company,
        });
      }

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const deleteCustomer = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to delete customer");
      return;
    }

    if (!window.confirm("Delete customer?")) return;

    try {
      await axiosInstance.delete(`/customer/delete/${id}`);
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Customers
        </h2>

        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">
            {editingId ? "Edit Customer" : "Add New Customer"}
          </h3>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {editingId ? "Update Customer" : "Add Customer"}
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h4 className="text-lg font-semibold text-blue-700">{customer.name}</h4>
              <p className="text-gray-700">{customer.email}</p>
              <p className="text-gray-700">{customer.phone}</p>
              <p className="text-gray-700 mb-4">{customer.company}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      alert("Please login to edit customer");
                      return;
                    }
                    setEditingId(customer._id);
                    setName(customer.name);
                    setEmail(customer.email);
                    setPhone(customer.phone);
                    setCompany(customer.company);
                  }}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
