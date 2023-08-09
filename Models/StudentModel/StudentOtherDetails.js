const db = require('mongoose');

const StudentOtherDetailsSchema = db.Schema({
    student_id: {
        type: String,
        required: true,
    },
    sub_cast: {
        type: String,
        required: false,
    },
    merital_status: {
        type: String,
        required: false,
    },
    mother_tongue: {
        type: String,
        required: false,
    },
    nationality: {
        type: String,
        required: false,
    },
    blood_group: {
        type: String,
        required: false,
    },
});

module.exports = db.model('StudentOtherDetails', StudentOtherDetailsSchema);

