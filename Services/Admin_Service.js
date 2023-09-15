const AdminDetails = require("../Models/AdminDetails");

async function getAdminDetailsById(admin_id){

    try {
        const adminDetails = await AdminDetails.findOne({ admin_id: admin_id });
        return adminDetails;
    } catch (err) {
        console.log(err);
    }

    return null;
}

module.exports.getAdminDetailsById = getAdminDetailsById;