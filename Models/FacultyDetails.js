const db = require('mongoose');

const FacultyDetailsSchema = db.Schema({
    faculty_id: {
        type: String,
        required: true,
    },
    faculty_name: {
        type: String,
        required: true,
    },
    faculty_email: {
        type: String,
        required: true,
    },
    faculty_mobile_number: {
        type: String,
        required: true,
    },
    faculty_experience: {
        type: String,
        required: true,
    },
    faculty_qualification: {
        type: String,
        required: true,
    },
    faculty_designation: {
        type: String,
        required: true,
    },
    faculty_department: {
        type: String,
        required: true,
    },
});

module.exports = db.model('FacultyDetails', FacultyDetailsSchema);