const { Router } = require('express');
const customerRouter = Router();
const customerController = require("../controllers/customers");

customerRouter.post('/', customerController.addCustomer);
customerRouter.get('/', customerController.getAllCustomers);


module.exports = {
    customerRouter,
};