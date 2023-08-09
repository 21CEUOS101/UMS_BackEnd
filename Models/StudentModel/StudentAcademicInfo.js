const db = require('mongoose');

const StudentAcademicInfoSchema = db.Schema({
    student_id: {
        type: String,
        required: true,
    },
    medium_of_exam: {
        type: [String],
        required: true,
    },
    seat_number: {
        type: [String],
        required: true,
    },
    passing_year: {
        type: [String],
        required: true,
    },
    passing_month: {
        type: [String],
        required: true,
    },
    board: {
        type: [String],
        required: true,
    },
    institute_name: {
        type: [String],
        required: true,
    },
    result_type: {
        type: [String],
        required: true,
    },
    result: {
        type: [String],
        required: true,
    },
});

module.exports = db.model('StudentAcademicInfo', StudentAcademicInfoSchema);