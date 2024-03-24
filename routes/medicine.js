const { Router } = require('express');
const medicineRouter = Router()

const medicineController = require('../controllers/medicine');

medicineRouter.post('/', medicineController.addMedicine);
medicineRouter.put('/:id',medicineController.updateMedicine);
<<<<<<< HEAD
=======
medicineRouter.delete('/:id', medicineController.deleteMedicine);
>>>>>>> eab8267 (Delete medicine)
medicineRouter.get('/getMedicine',medicineController.getMedicineById);

module.exports = {
    medicineRouter
};
