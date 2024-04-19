const { Router } = require('express');
const medicineRouter = Router()

const medicineController = require('../controllers/medicine');

medicineRouter.post('/', medicineController.addMedicine);
medicineRouter.put('/:id',medicineController.updateMedicine);

medicineRouter.delete('/:id', medicineController.deleteMedicine);

medicineRouter.get('/:id',medicineController.getMedicineById);



medicineRouter.get("/", medicineController.getAllMedicines);




module.exports = {
    medicineRouter
};
