const mongoose = require('mongoose');

const TPODetailsSchema = mongoose.Schema({

    tpo_id: {
        type: String,
        required: true,
    },
    tpo_name: {
        type: String,
        required: true,
    },
    tpo_email: {
        type: String,
        required: true,
    },
    tpo_mobile_number: {
        type: String,
        required: true,
    },
    tpo_experience: {
        type: String,
        required: true,
    },
    tpo_qualification: {
        type: String,
        required: true,
    },
    tpo_designation: {
        type: String,
        required: true,
    },
    tpo_department: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('TPODetails', TPODetailsSchema);