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
        type: String,
        required: true
    },
    subject_alias: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    theory_min_passing_marks: {
        type: String,
        required: true
    },
    theory_min_passing_marks2: {
        type: String,
        required: true
    },
    theory_total_marks: {
        type: String,
        required: true
    },
    sessional_min_passing_marks: {
        type: String,
        required: true
    },
    sessional_min_passing_marks2: {
        type: String,
        required: true
    },
    sessional_total_marks: {
        type: String,
        required: true
    },
    practical_min_passing_marks: {
        type: String,
        required: true
    },
    practical_min_passing_marks2: {
        type: String,
        required: true
    },
    practical_total_marks: {
        type: String,
        required: true
    },
    isElective: {
        type: String,
        required: true
    }
});

module.exports = db.model('CourseDetails', CourseDetails);