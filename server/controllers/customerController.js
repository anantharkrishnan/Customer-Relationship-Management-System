const Customer = require("../models/customerModel");

// CREATE CUSTOMER
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      user: req.user
    });
    await customer.save();
    res.json(customer);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ msg: "Server error" });
  }
};

// GET CUSTOMERS
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find({ user: req.user });
  res.json(customers);
};

// UPDATE CUSTOMER
exports.updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(customer);
};

// DELETE CUSTOMER
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ msg: "Customer deleted" });
};
