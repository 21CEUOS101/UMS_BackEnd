const express = require("express");

const router = express.Router();

const StudentDetails = require("../Models/StudentModel/StudentDetails");
const StudentGuardianInfo = require("../Models/StudentModel/StudentGuardianInfo");
const StudentExamResult = require("../Models/StudentModel/StudentExamResult");
const CourseDetails = require("../Models/StudentModel/CourseDetails");
const StudentOtherDetails = require("../Models/StudentModel/StudentOtherDetails");
const StudentFeesInfo = require("../Models/StudentModel/StudentFeesInfo");
const StudentAcademicInfo = require("../Models/StudentModel/StudentAcademicInfo");
const StudentContactInfo = require("../Models/StudentModel/StudentContactInfo");
const TimeTableBlock = require("../Models/ComponentModel/TimeTableBlock");
router.use(express.json());

router.use("/announcement", require("../Functionalities/MakeAnnouncement"));

// Get Student by Roll Number

router.get("/getStudentByRollNumber/:roll_number", async (req, res) => {
    try {
        const studentDetails = await StudentDetails.find(
            {
                student_id: req.params.roll_number
            }
        );
        const studentGuardianInfo = await StudentGuardianInfo.find(
            {
                student_id: studentDetails[0].student_id
            }
        );
        const studentOtherDetails = await StudentOtherDetails.find(
            {
                student_id: studentDetails[0].student_id
            }
        );
        const studentContactInfo = await StudentContactInfo.find(
            {
                student_id: studentDetails[0].student_id
            }
        );
        const studentAcademicInfo = await StudentAcademicInfo.find(
            {
                student_id: studentDetails[0].student_id
            }
        );
        res.json({
            studentDetails: studentDetails,
            studentGuardianInfo: studentGuardianInfo,
            studentOtherDetails: studentOtherDetails,
            studentContactInfo: studentContactInfo,
            studentAcademicInfo: studentAcademicInfo
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Get Each Student Info by Student ID

router.get("/getStudentDetails/:student_id", async (req, res) => {

    try {
        const studentDetails = await StudentDetails.find({
            student_id: req.params.student_id
        });
        res.json(studentDetails);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getStudentGuardianInfo/:student_id", async (req, res) => {

    try {
        const studentGuardianInfo = await StudentGuardianInfo.find({
            student_id: req.params.student_id
        });
        res.json(studentGuardianInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getStudentExamResult/:student_id", async (req, res) => {
    
        try {
            const studentExamResult = await StudentExamResult.find({
                student_id: req.params.student_id
            });
            res.json(studentExamResult);
        } catch (err) {
            res.json({
                message: err
            });
        }
}   
);

router.get("/getStudentExamResultSem/:semester/:student_id", async (req, res) => {
    console.log(req.params.student_id, req.params.semester);
    try {
        const studentExamResult = await StudentExamResult.findOne({
            student_id: req.params.student_id,
            semester: req.params.semester
        });
        console.log(studentExamResult);
        res.json(studentExamResult);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getAllStudentEmails", async (req, res) => {
    try {
        const studentEmails = await StudentDetails.find().distinct("student_email");
        res.json(studentEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get all student emails by semester

router.get("/getAllStudentEmailsBySemester/:semester", async (req, res) => {
    try {
        const studentEmails = await StudentDetails.find({ session_number: req.params.semester }).distinct("student_email");
        res.json(studentEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getCourseDetails/:student_id", async (req, res) => {
        
            try {
                const courseDetails = await CourseDetails.find({
                    student_id: req.params.student_id
                });
                res.json(courseDetails);
            } catch (err) {
                res.json({
                    message: err
                });
            }
}
);

router.get("/getStudentOtherDetails/:student_id", async (req, res) => {

    try {
        const studentOtherDetails = await StudentOtherDetails.find({
            student_id: req.params.student_id
        });
        res.json(studentOtherDetails);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getStudentFeesInfo/:student_id", async (req, res) => {

    try {
        const studentFeesInfo = await StudentFeesInfo.find({
            student_id: req.params.student_id
        });
        res.json(studentFeesInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getStudentAcademicInfo/:student_id", async (req, res) => {

    try {
        const studentAcademicInfo = await StudentAcademicInfo.find({
            student_id: req.params.student_id
        });
        res.json(studentAcademicInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.get("/getStudentContactInfo/:student_id", async (req, res) => {

    try {
        const studentContactInfo = await StudentContactInfo.find({
            student_id: req.params.student_id
        });
        res.json(studentContactInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);



// Get Student

router.get("/getStudentByStudentId", async (req, res) => {
    try {
        const studentDetails = await StudentDetails.find(
            {
                student_id: req.body.student_id
            }
        );
        
        const studentGuardianInfo = await StudentGuardianInfo.find(
            {
                student_id: studentDetails[0].student_id
            }
        );

        const studentOtherDetails = await StudentOtherDetails.find(
            {
                student_id: studentDetails[0].student_id
            }   
        );

        const studentContactInfo = await StudentContactInfo.find(
            {
                student_id: studentDetails[0].student_id
            }   
        );

        const studentAcademicInfo = await StudentAcademicInfo.find(
            {
                student_id: studentDetails[0].student_id
            }   
        );

        res.json({
            studentDetails: studentDetails,
            studentGuardianInfo: studentGuardianInfo,
            studentOtherDetails: studentOtherDetails,
            studentContactInfo: studentContactInfo,
            studentAcademicInfo: studentAcademicInfo
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Get All Students

router.get("/getAllStudents", async (req, res) => {
    try {
        
        const studentDetails = await StudentDetails.find();
        const studentGuardianInfo = await StudentGuardianInfo.find();
        const studentOtherDetails = await StudentOtherDetails.find();
        const studentContactInfo = await StudentContactInfo.find();
        const studentAcademicInfo = await StudentAcademicInfo.find();

        res.json({
            studentDetails: studentDetails,
            studentGuardianInfo: studentGuardianInfo,
            studentOtherDetails: studentOtherDetails,
            studentContactInfo: studentContactInfo,
            studentAcademicInfo: studentAcademicInfo
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error getting students details.",
            error: err.message,
          });
    }
}
);

// Get All Students by session

router.get('/getStudentsBySession/:sessionNumber', async (req, res) => {
    try {
      const sessionNumber = req.params.sessionNumber; // Get the sessionNumber from the URL parameter
  
      // Query the database to find students with the specified session number
      const students = await StudentDetails.find({ session_number: sessionNumber });
  
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No students found for the specified session number.' });
      }
  
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students by session number:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  

// Get Course for current semester

router.get("/getCourseForCurrentSemester/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const studentDetails = await StudentDetails.find({
            student_id: req.params.id
        });
        console.log(studentDetails[0]?.session_number);
        const courseDetails = await CourseDetails.find(
            {
                semester: studentDetails[0]?.session_number
            }
        );
        res.json({
            courseDetails: courseDetails
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Ger All Course Details

router.get("/getAllCourseDetails", async (req, res) => {
    try {
        const courseDetails = await CourseDetails.find();
        res.json({
            courseDetails: courseDetails
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);


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

router.get('/getSpecificTimeTableBlockDetails/:time_table_block_id/:time_table_id', async (req, res) => {

    try {
        const specificTimeTableBlockDetails = await TimeTableBlock.findOne({ time_table_id : req.params.time_table_id , time_table_block_id: req.params.time_table_block_id });
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

// Get Unique Session Number
router.get('/getUniqueSessionNumbers', async (req, res) => {
    try {
      // Query your database to get unique session numbers
      const uniqueSessionNumbers = await StudentDetails.distinct('session_number');
  
      // Send the session numbers as JSON response
      res.json(uniqueSessionNumbers);
    } catch (error) {
      console.error('Error fetching unique session numbers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;



