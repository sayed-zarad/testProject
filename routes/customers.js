const { Router } = require('express');
const customerRouter = Router();
const customerController = require("../controllers/customers");

customerRouter.post('/', customerController.addCustomer);
customerRouter.get('/', customerController.getAllCustomers);
customerRouter.put('/:id', customerController.updateCustomer); 
customerRouter.delete('/:id', customerController.deleteCustomer);

module.exports = {
    customerRouter,
};