const mongoose = require('mongoose');

const HODDetailsSchema = mongoose.Schema({
    hod_id: {
        type: String,
        required: true,
    },
    hod_name: {
        type: String,
        required: true,
    },
    hod_email: {
        type: String,
        required: true,
    },
    hod_mobile_number: {
        type: String,
        required: true,
    },
    hod_experience: {
        type: String,
        required: true,
    },
    hod_qualification: {
        type: String,
        required: true,
    },
    hod_designation: {
        type: String,
        required: true,
    },
    hod_department: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('HODDetails', HODDetailsSchema);