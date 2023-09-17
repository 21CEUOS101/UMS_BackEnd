const db = require('mongoose');

const StudentFeesInfoSchema = db.Schema({
    student_id: {
        type: String,
        required: true,
    },
    txn_date: {
        type: String,
        required: true,
    },
    voucher_number: {
        type: String,
        required: true,
    },
    batch_year: {
        type: String,
        required: true,
    },
    session_no: {
        type: String,
        required: true,
    },
    admission_type: {
        type: String,
        required: true,
    },
    fees_amount: {
        type: String,
        required: true,
    },
    txn_status: {
        type: String,
        required: true,
    },
    payment_mode: {
        type: String,
        required: true,
    },
    cheque_number: {
        type: String,
        required: false,
    },
    cheque_date: {
        type: String,
        required: false,
    },
    bank_name: {
        type: String,
        required: false,
    },
    paid_date: {
        type: String,
        required: true,
    },
    reconsile_date: {
        type: String,
        required: false,
    },
    reconsile_number: {
        type: String,
        required: false,
    },
});

module.exports = db.model('StudentFeesInfo', StudentFeesInfoSchema);

