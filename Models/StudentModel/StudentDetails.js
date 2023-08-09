const db = require('mongoose');

const StudentSchema = db.Schema({
    reporting_date: {
        type: String,
        required: true,
    },
    admission_type: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        required: false,
    },
    last_name: {
        type: String,
        required: true,
    },
    name_format: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    birth_place: {
        type: String,
        required: true,
    },
    ACPC_seat_allotment_date: {
        type: String,
        required: false,
    },
    isD2D: {
        type: Boolean,
        required: true,
    },
    enrollment_year: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    qualifying_exam_roll_number: {
        type: String,
        required: true,
    },
    session_number: {
        type: Number,
        required: true,
    },
    batch_year: {
        type: String,
        required: true,
    },
    student_id: {
        type: String,
        required: true,
        unique : true,
    },
    old_student_id: {
        type: String,
        required: false,
        unique : true,
    },
    merit_rank: {
        type: String,
        required: true,
    },
    cast_category: {
        type: String,
        required: true,
    },
    student_email: {
        type: String,
        required: true,
    },
    student_roll_number: {
        type: String,
        required: true,
    },
});

module.exports = db.model('Student', StudentSchema);
