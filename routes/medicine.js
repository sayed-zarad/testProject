const { Router } = require('express');
const medicineRouter = Router()

const medicineController = require('../controllers/medicine');

medicineRouter.post('/', medicineController.addMedicine);
medicineRouter.put('/:id',medicineController.updateMedicine);

module.exports = {
    medicineRouter
};
