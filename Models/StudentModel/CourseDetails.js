const db = require('mongoose');

const CourseDetails = db.Schema({
    
    subject_code: {
        type: String,
        required: true
    },
    subject_name: {
        type: String,
        required: true
    },
    subject_credit: {
        type: Number,
        required: true
    },
    subject_alias: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    theory_min_passing_marks: {
        type: Number,
        required: true
    },
    theory_min_passing_marks2: {
        type: Number,
        required: true
    },
    theory_total_marks: {
        type: Number,
        required: true
    },
    sessional_min_passing_marks: {
        type: Number,
        required: true
    },
    sessional_min_passing_marks2: {
        type: Number,
        required: true
    },
    sessional_total_marks: {
        type: Number,
        required: true
    },
    practical_min_passing_marks: {
        type: Number,
        required: true
    },
    practical_min_passing_marks2: {
        type: Number,
        required: true
    },
    practical_total_marks: {
        type: Number,
        required: true
    },
    isElective: {
        type: Boolean,
        required: true
    }
});

module.exports = db.model('CourseDetails', CourseDetails);