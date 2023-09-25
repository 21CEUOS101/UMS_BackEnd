const db = require('mongoose');

const StudentExamResult = db.Schema({
    student_id: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    batch_year: {
        type: String,
        required: true
    },
    subject_code: {
        type: [String],
        required: true
    },
    subject_name: {
        type: [String],
        required: true
    },

    // Theory marks
    sessional1_marks: {
        type: [String],
        required: true
    },
    sessional2_marks: {
        type: [String],
        required: true
    },
    sessional3_marks: {
        type: [String],
        required: true
    },

    // Is present or not
    sessional1_present: {
        type: [String],
        required: true
    },
    sessional2_present: {
        type: [String],
        required: true
    },
    sessional3_present: {
        type: [String],
        required: true
    },

    // Theory attendance
    sessional1_attendance: {
        type: [String],
        required: true
    },
    sessional2_attendance: {
        type: [String],
        required: true
    },
    sessional3_attendance: {
        type: [String],
        required: true
    },
    sessional1_total_attendance: {
        type: [String],
        required: true
    },
    sessional2_total_attendance: {
        type: [String],
        required: true
    },
    sessional3_total_attendance: {
        type: [String],
        required: true
    },

    // Practical attendance
    sessional1_practical_attendance: {
        type: [String],
        required: true
    },
    sessional2_practical_attendance: {
        type: [String],
        required: true
    },
    sessional3_practical_attendance: {
        type: [String],
        required: true
    },
    sessional1_total_practical_attendance: {
        type: [String],
        required: true
    },
    sessional2_total_practical_attendance: {
        type: [String],
        required: true
    },
    sessional3_total_practical_attendance: {
        type: [String],
        required: true
    },

    // Block marks and present
    block_marks: {
        type: [String],
        required: true
    },
    block_present: {
        type: [String],
        required: true
    },

    // External marks and present
    external_marks: {
        type: [String],
        required: true
    },
    external_status: {
        type: [String],
        required: true
    },

    // Average marks and status
    avg_sessional_marks: {
        type: [String],
        required: true
    },
    sessional_status: {
        type: [String],
        required: true
    },
    avg_practical_marks: {
        type: [String],
        required: true
    },
    practical_status: {
        type: [String],
        required: true
    },

    // Termwork marks and status
    termwork_marks: {
        type: [String],
        required: true
    },
    termwork_status: {
        type: [String],
        required: true
    },

    // Total marks and status
    total_marks: {
        type: [String],
        required: true
    },
    max_total_marks: {
        type: [String],
        required: true
    },

    // Grade and credit
    subject_points: {
        type: [String],
        required: true
    },
    subject_grade: {
        type: [String],
        required: true
    },
    subject_credit: {
        type: [String],
        required: true
    },
    subject_status: {
        type: [String],
        required: true
    },

    // Total points and grade and status

    spi_credit: {
        type: String,
        required: true
    },
    spi_points: {
        type: String,
        required: true
    },
    spi: {
        type: String,
        required: true
    },
    cpi_credit: {
        type: String,
        required: true
    },
    cpi_points: {
        type: String,
        required: true
    },
    cpi: {
        type: String,
        required: true
    },
    result_status: {
        type: String,
        required: true
    }
});

module.exports = db.model('StudentExamResult', StudentExamResult);


