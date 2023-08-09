const db = require('mongoose');

const StudentExamResult = db.Schema({
    student_id: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    batch_year: {
        type: Number,
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
        type: [Number],
        required: true
    },
    sessional2_marks: {
        type: [Number],
        required: true
    },
    sessional3_marks: {
        type: [Number],
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
        type: [Number],
        required: true
    },
    sessional2_attendance: {
        type: [Number],
        required: true
    },
    sessional3_attendance: {
        type: [Number],
        required: true
    },
    sessional1_total_attendance: {
        type: [Number],
        required: true
    },
    sessional2_total_attendance: {
        type: [Number],
        required: true
    },
    sessional3_total_attendance: {
        type: [Number],
        required: true
    },

    // Practical attendance
    sessional1_practical_attendance: {
        type: [Number],
        required: true
    },
    sessional2_practical_attendance: {
        type: [Number],
        required: true
    },
    sessional3_practical_attendance: {
        type: [Number],
        required: true
    },
    sessional1_total_practical_attendance: {
        type: [Number],
        required: true
    },
    sessional2_total_practical_attendance: {
        type: [Number],
        required: true
    },
    sessional3_total_practical_attendance: {
        type: [Number],
        required: true
    },

    // Block marks and present
    block_marks: {
        type: [Number],
        required: true
    },
    block_present: {
        type: [String],
        required: true
    },

    // External marks and present
    external_marks: {
        type: [Number],
        required: true
    },
    external_status: {
        type: [String],
        required: true
    },

    // Average marks and status
    avg_sessional_marks: {
        type: [Number],
        required: true
    },
    sessional_status: {
        type: [String],
        required: true
    },
    avg_practical_marks: {
        type: [Number],
        required: true
    },
    practical_status: {
        type: [String],
        required: true
    },

    // Termwork marks and status
    termwork_marks: {
        type: [Number],
        required: true
    },
    termwork_status: {
        type: [String],
        required: true
    },

    // Total marks and status
    total_marks: {
        type: [Number],
        required: true
    },
    max_total_marks: {
        type: [Number],
        required: true
    },

    // Grade and credit
    subject_points: {
        type: [Number],
        required: true
    },
    subject_grade: {
        type: [String],
        required: true
    },
    subject_credit: {
        type: [Number],
        required: true
    },
    subject_status: {
        type: [String],
        required: true
    },

    // Total points and grade and status

    spi_credit: {
        type: Number,
        required: true
    },
    spi_points: {
        type: Number,
        required: true
    },
    spi: {
        type: Number,
        required: true
    },
    cpi_credit: {
        type: Number,
        required: true
    },
    cpi_points: {
        type: Number,
        required: true
    },
    cpi: {
        type: Number,
        required: true
    },
    result_status: {
        type: String,
        required: true
    }
});


