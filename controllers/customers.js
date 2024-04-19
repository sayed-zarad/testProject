const express = require("express");
const bodyParser = require("body-parser");
const Customer  =require("../models/customers");
const app = express();


app.use(bodyParser.json());

const addCustomer =async(req, res)=> {
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

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomerById,
  };