const db = require('mongoose');

const StudentGuardianInfoSchema = db.Schema({
    student_id: {
        type: String,
        required: true,
    },
    father_name: {
        type: String,
        required: true,
    },
    father_occupation: {
        type: String,
        required: false,
    },
    organization_name: {
        type: String,
        required: false,
    },
    annual_income: {
        type: String,
        required: false,
    },
});

module.exports = db.model('StudentGuardianInfo', StudentGuardianInfoSchema);
