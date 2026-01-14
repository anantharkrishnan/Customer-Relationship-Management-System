const express = require('express');
const taskRouter = express.Router();
const authUser= require('../middlewares/authUser')

const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

taskRouter.get('/allcustomers', authUser, getCustomers);
taskRouter.post('/create', authUser, createCustomer);
taskRouter.put('/update/:id', authUser,  updateCustomer);
taskRouter.delete('/delete/:id', authUser, deleteCustomer);

module.exports = taskRouter;