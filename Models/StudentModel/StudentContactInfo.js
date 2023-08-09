const db = require('mongoose');
const StudentContactInfoSchema = db.Schema({
    student_id: {
        type: String,
        required: true,
    },
    address_line_1: {
        type: String,
        required: true,
    },
    address_line_2: {
        type: String,
        required: false,
    },
    address_line_3: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: String,
        required: true,
    },
    alternate_mobile_number: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    local_address_line_1: {
        type: String,
        required: true,
    },
    local_address_line_2: {
        type: String,
        required: false,
    },
    local_address_line_3: {
        type: String,
        required: false,
    },
    local_city: {
        type: String,
        required: true,
    },
});

module.exports = db.model('StudentContactInfo', StudentContactInfoSchema);