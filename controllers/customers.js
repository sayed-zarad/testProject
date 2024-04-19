const express = require("express");
const bodyParser = require("body-parser");
const Customer = require("../models/customers");
const app = express();

app.use(bodyParser.json());

const addCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, address } = req.body;
        const customer = new Customer({ name, phoneNumber, address });
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCustomerById = async (req, res) => {
  try {
      const customerId = req.params.id;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(customer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, address } = req.body;

        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (name) customer.name = name;
        if (phoneNumber) customer.phoneNumber = phoneNumber;
        if (address) customer.address = address;

        await customer.save();

        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
  try {
      const { id } = req.params;

      const customer = await Customer.findById(id);
      if (!customer) {
          return res.status(404).json({ message: "Customer not found" });
      }

      await Customer.findByIdAndDelete(id);
      res.json({ message: "Customer deleted successfully" });
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = {
    addCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
};
