const { Router } = require('express');
const medicineRouter = Router()

const medicineController = require('../controllers/medicine');

medicineRouter.post('/', medicineController.addMedicine);
medicineRouter.put('/:id',medicineController.updateMedicine);
medicineRouter.delete('/:id', medicineController.deleteMedicine);
medicineRouter.get('/getMedicine',medicineController.getMedicineById);

module.exports = {
    medicineRouter
};
