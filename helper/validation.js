const Joi = require('joi');

function validateMedicine(medicine) {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).required(),
        dosage: Joi.string().min(1).required(),
        manufacturer: Joi.string().min(3).required()
    });

    return schema.validate(medicine);
}

module.exports = {
    validateMedicine,
};
