const db = require('mongoose');

const Placement_CompanyDetailsSchema = mongoose.Schema({

    placement_company_id: {
        type: String,
        required: true,
    },
    placement_company_name: {
        type: String,
        required: true,
    },
    placement_company_email: {
        type: String,
        required: true,
    },
    placement_company_mobile_number: {
        type: String,
        required: true,
    },
    placement_company_address: {
        type: String,
        required: true,
    },
    placement_company_city: {
        type: String,
        required: true,
    },
    placement_company_state: {
        type: String,
        required: true,
    },
    placement_company_pincode: {
        type: String,
        required: true,
    },
    placement_company_country: {
        type: String,
        required: true,
    },
    placement_company_website: {
        type: String,
        required: true,
    },
    placement_company_type: {
        type: String,
        required: true,
    },
    placement_company_description: {
        type: String,
        required: true,
    },
    placement_company_job_role: {
        type: [String],
        required: true,
    },
    placement_company_job_description: {
        type: [String],
        required: true,
    },
    no_of_student_placed: {
        type: String,
        required: true,
    },
    
});

module.exports = db.model('Placement_CompanyDetailsSchema', Placement_CompanyDetailsSchema);