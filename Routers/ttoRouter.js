const express = require('express');

const router = express.Router();
const TimeTableBlock = require('../Models/ComponentModel/TimeTableBlock');
const TTODetails = require("../Models/TTODetails");
const PDFDocument = require('pdfkit');
const MakeAnnouncement = require("../Functionalities/MakeAnnouncement");
// Get specific TTO details

router.get('/getSpecificTTODetails/:tto_id', async (req, res) => {

    try {
        const specificTTODetails = await TTODetails.findOne({ tto_id: req.params.tto_id });
        res.json(specificTTODetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all TTO details

router.get('/getAllTTODetails', async (req, res) => {

    try {
        const allTTODetails = await TTODetails.find();
        res.json(allTTODetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all TTO Emails

router.get("/getAllTTOEmails", async (req, res) => {
    try {
        const ttoEmails = await TTODetails.find().distinct("tto_email");
        res.json(ttoEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all time table block details

router.get('/getAllTimeTableBlockDetails', async (req, res) => {

    try {
        const allTimeTableBlockDetails = await TimeTableBlock.find();
        res.json(allTimeTableBlockDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get a specific time table block details

router.get('/getSpecificTimeTableBlockDetails/:time_table_block_id', async (req, res) => {

    try {
        const specificTimeTableBlockDetails = await TimeTableBlock.findOne({ time_table_block_id: req.params.time_table_block_id });
        res.json(specificTimeTableBlockDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);



// Get all Blocks by Time Table ID

router.get('/getAllBlocksByTimeTableID/:time_table_id', async (req, res) => {

    try {
        const allBlocksByTimeTableID = await TimeTableBlock.find({ time_table_id: req.params.time_table_id });
        res.json(allBlocksByTimeTableID);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get Time Table Block Details by Specific Time Table ID and Specific Time Table Block ID

router.get('/getSpecificTimeTableSpecificBlockDetails/:time_table_block_id/:time_table_id', async (req, res) => {
    console.log(req.params.time_table_id, req.params.time_table_block_id);
    try {
        const specificTimeTableBlockDetails = await TimeTableBlock.findOne({
            time_table_id: req.params.time_table_id,
            time_table_block_id: req.params.time_table_block_id
        });
        if (specificTimeTableBlockDetails) {
            res.json(specificTimeTableBlockDetails);
        } else {
            res.json({ message: 'Time Table Block not found' });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Get all Blocks by Semester section and department

router.get('/getAllBlocksBySemesterSectionAndDepartment/:time_table_department/:time_table_semester/:time_table_section', async (req, res) => {

    try {
        const allBlocksBySemesterSectionAndDepartment = await TimeTableBlock.find({ time_table_department: req.params.time_table_department, time_table_semester: req.params.time_table_semester, time_table_section: req.params.time_table_section });
        res.json(allBlocksBySemesterSectionAndDepartment);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all Blocks by Semester section section_no and department

router.get('/getAllBlocksBySemesterSectionAndDepartment/:time_table_department/:time_table_semester/:time_table_section/:time_table_section_no', async (req, res) => {

    try {
        const allBlocksBySemesterSectionAndDepartment = await TimeTableBlock.find({
            time_table_department: req.params.time_table_department,
            time_table_semester: req.params.time_table_semester,
            time_table_section: req.params.time_table_section,
            time_table_block_section_no: req.params.time_table_section_no
        });
        res.json(allBlocksBySemesterSectionAndDepartment);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all blocks by department

router.get('/getAllBlocksByDepartment/:time_table_department', async (req, res) => {

    try {
        const allBlocksByDepartment = await TimeTableBlock.find({ time_table_department: req.params.time_table_department });
        res.json(allBlocksByDepartment);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Add a time table block details

router.post('/addTimeTableBlockDetails', async (req, res) => {
    console.log(req.body);
    

    try {
        const timeTableBlock = new TimeTableBlock({
            time_table_block_id: req.body.time_table_block_id,
            time_table_id: req.body.time_table_id,
            time_table_block_department: req.body.time_table_block_department,
            time_table_block_semester: req.body.time_table_block_semester,
            time_table_block_section: req.body.time_table_block_section,
            time_table_block_day: req.body.time_table_block_day,
            time_table_block_time: req.body.time_table_block_time,
            time_table_block_subject: req.body.time_table_block_subject,
            time_table_block_faculty: req.body.time_table_block_faculty,
            time_table_block_room_no: req.body.time_table_block_room_no,
            time_table_block_section_no: req.body.time_table_block_section_no,
        });
        console.log(timeTableBlock);
        const savedTimeTableBlock = await timeTableBlock.save();
        console.log(savedTimeTableBlock);
        res.json(savedTimeTableBlock);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Update a time table block details
router.patch('/updateTimeTableBlockDetails/:time_table_block_id/:time_table_id', async (req, res) => {

    try {
        const updatedTimeTableBlockDetails = await TimeTableBlock.updateOne(
            { time_table_block_id: req.params.time_table_block_id , time_table_id: req.params.time_table_id },
            {
                $set: {
                    time_table_id: req.body.time_table_id,
                    time_table_block_department: req.body.time_table_department,
                    time_table_block_semester: req.body.time_table_semester,
                    time_table_block_section: req.body.time_table_section,
                    time_table_block_day: req.body.time_table_block_day,
                    time_table_block_time: req.body.time_table_block_time,
                    time_table_block_subject: req.body.time_table_block_subject,
                    time_table_block_faculty: req.body.time_table_block_faculty,
                    time_table_block_room_no: req.body.time_table_block_room_no,
                    time_table_block_section_no: req.body.time_table_block_section_no,
                }
            }
        );
        res.json(updatedTimeTableBlockDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Delete a time table block details

router.delete('/deleteTimeTableBlockDetails/:time_table_block_id', async (req, res) => {

    try {
        const removedTimeTableBlockDetails = await TimeTableBlock.remove({ time_table_block_id: req.params.time_table_block_id });
        res.json(removedTimeTableBlockDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Delete a time table details
router.delete('/deleteTimeTableBlockDetails/:time_table_id', async (req, res) => {

    try {
        const removedTimeTableBlockDetails = await TimeTableBlock.remove({ time_table_id: req.params.time_table_id });
        res.json(removedTimeTableBlockDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Generate Time Table PDF

router.get('/generateTimeTablePDF/:time_table_id', async (req, res) => {

    try {
        const allBlocksByTimeTableID = await TimeTableBlock.find({ time_table_id: req.params.time_table_id });
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('TimeTable.pdf'));
        doc.text('Time Table', 100, 50);
        doc.text('Time Table ID : ' + req.params.time_table_id, 100, 70);
        doc.text('Department : ' + allBlocksByTimeTableID[0].time_table_block_department, 100, 90);
        doc.text('Semester : ' + allBlocksByTimeTableID[0].time_table_block_semester, 100, 110);
        doc.text('Section : ' + allBlocksByTimeTableID[0].time_table_block_section, 100, 130);
        doc.text(JSON.stringify(allBlocksByTimeTableID), 100, 150);
        doc.end();

        res.json(allBlocksByTimeTableID);
    } catch (err) {
        res.json({ message: err });
    }
}
);

router.use("/", require("../Functionalities/MakeAnnouncement"));
module.exports = router;
