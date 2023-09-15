const db = require('mongoose');

const AdminDetailsSchema = db.Schema({
    admin_id: {
        type: String,
        required: true,
    },
    admin_name: {
        type: String,
        required: true,
    },
    admin_email: {
        type: String,
        required: true,
    },
    admin_mobile_number: {
        type: String,
        required: true,
    },
    admin_designation: {
        type: String,
        required: true,
    },
    admin_department: {
        type: String,
        required: true,
    },
});