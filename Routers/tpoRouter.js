const express = require('express');

const router = express.Router();

const Placement_CompanyDetails = require('../Models/ComponentModel/Placement_CompanyDetails');
const TPODetails = require("../Models/TPODetails");
const MakeAnnouncement = require("../Functionalities/MakeAnnouncement");
// Get specific TPO details

router.get('/getSpecificTPODetails/:tpo_id', async (req, res) => {

    try {
        const specificTPODetails = await TPODetails.findOne({ tpo_id: req.params.tpo_id });
        res.json(specificTPODetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all TPO details

router.get('/getAllTPODetails', async (req, res) => {

    try {
        const allTPODetails = await TPODetails.find();
        res.json(allTPODetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

router.get("/getAllTPOEmails", async (req, res) => {
    try {
        const tpoEmails = await TPODetails.find().distinct("tpo_email");
        res.json(tpoEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all placement company details

router.get('/getAllPlacementCompanyDetails', async (req, res) => {

    try {
        const allPlacementCompanyDetails = await Placement_CompanyDetails.find();
        res.json(allPlacementCompanyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get a specific placement company details

router.get('/getSpecificPlacementCompanyDetails/:placement_company_id', async (req, res) => {

    try {
        const specificCompanyDetails = await Placement_CompanyDetails.findOne({ placement_company_id: req.params.placement_company_id });
        res.json(specificCompanyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all placement company details by placement_company_name

router.get('/getAllPlacementCompanyDetailsByPlacementCompanyName/:placement_company_name', async (req, res) => {

    try {
        const allPlacementCompanyDetailsByPlacementCompanyName = await Placement_CompanyDetails.find({ placement_company_name: req.params.placement_company_name });
        res.json(allPlacementCompanyDetailsByPlacementCompanyName);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all placement company details by placement_company_type

router.get('/getAllPlacementCompanyDetailsByPlacementCompanyType/:placement_company_type', async (req, res) => {

    try {
        const allPlacementCompanyDetailsByPlacementCompanyType = await Placement_CompanyDetails.find({ placement_company_type: req.params.placement_company_type });
        res.json(allPlacementCompanyDetailsByPlacementCompanyType);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// create a new placement company details

router.post('/createNewPlacementCompanyDetails', async (req, res) => {

    
    try {
        const placement_company_details = new Placement_CompanyDetails({
            placement_company_id: req.body.placement_company_id,
            placement_company_name: req.body.placement_company_name,
            placement_company_email: req.body.placement_company_email,
            placement_company_mobile_number: req.body.placement_company_mobile_number,
            placement_company_address: req.body.placement_company_address,
            placement_company_city: req.body.placement_company_city,
            placement_company_state: req.body.placement_company_state,
            placement_company_country: req.body.placement_company_country,
            placement_company_pincode: req.body.placement_company_pincode,
            placement_company_website: req.body.placement_company_website,
            placement_company_type: req.body.placement_company_type,
            placement_company_description: req.body.placement_company_description,
            placement_company_job_role: (req.body.placement_company_job_role).split(","),
            placement_company_job_description: (req.body.placement_company_job_description).split(","),
            no_of_student_placed: req.body.no_of_student_placed,
        });
        const savedPlacementCompanyDetails = await placement_company_details.save();
        console.log(savedPlacementCompanyDetails);
        res.json({
            message : "Placement Company Added Successfully"
        });
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Update placement company details by id

router.patch('/update-placement-company', async (req, res) => {
    console.log(req.body);
    try {
        const updatedPlacementCompanyDetails = await Placement_CompanyDetails.updateOne(
            { placement_company_id: req.body.placement_company_id },
            {
                $set: {
                    placement_company_name: req.body.placement_company_name,
                    placement_company_email: req.body.placement_company_email,
                    placement_company_mobile_number: req.body.placement_company_mobile_number,
                    placement_company_address: req.body.placement_company_address,
                    placement_company_city: req.body.placement_company_city,
                    placement_company_state: req.body.placement_company_state,
                    placement_company_country: req.body.placement_company_country,
                    placement_company_pincode: req.body.placement_company_pincode,
                    placement_company_website: req.body.placement_company_website,
                    placement_company_type: req.body.placement_company_type,
                    placement_company_description: req.body.placement_company_description,
                    placement_company_job_role: (req.body.placement_company_job_role).split(","),
                    placement_company_job_description: (req.body.placement_company_job_description).split(","),
                    no_of_student_placed: req.body.no_of_student_placed,
                }
            }
        );
        console.log(updatedPlacementCompanyDetails);
        res.json(updatedPlacementCompanyDetails);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

// Delete placement company details by id

router.delete('/delete-placement-company/:id', async (req, res) => {

    try {
        const removedPlacementCompanyDetails = await Placement_CompanyDetails.deleteOne({ placement_company_id: req.params.id });
        res.json(removedPlacementCompanyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);
router.use("/", require("../Functionalities/MakeAnnouncement"));
module.exports = router;