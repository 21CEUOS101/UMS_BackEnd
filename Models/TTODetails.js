const mongoose = require('mongoose');

const TTODetailsSchema = mongoose.Schema({
    tto_id: {
        type: String,
        required: true,
    },
    tto_name: {
        type: String,
        required: true,
    },
    tto_email: {
        type: String,
        required: true,
    },
    tto_mobile_number: {
        type: String,
        required: true,
    },
    tto_experience: {
        type: String,
        required: true,
    },
    tto_qualification: {
        type: String,
        required: true,
    },
    tto_designation: {
        type: String,
        required: true,
    },
    tto_department: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('TTODetails', TTODetailsSchema);