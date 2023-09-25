const express = require('express');
const router = express.Router();
const FacultyDetails = require('../Models/FacultyDetails');
const StudentDetails = require("../Models/StudentModel/StudentDetails");
const StudentGuardianInfo = require("../Models/StudentModel/StudentGuardianInfo");
const StudentExamResult = require("../Models/StudentModel/StudentExamResult");
const CourseDetails = require("../Models/StudentModel/CourseDetails");
const StudentOtherDetails = require("../Models/StudentModel/StudentOtherDetails");
const StudentFeesInfo = require("../Models/StudentModel/StudentFeesInfo");
const StudentAcademicInfo = require("../Models/StudentModel/StudentAcademicInfo");
const StudentContactInfo = require("../Models/StudentModel/StudentContactInfo");
const MakeAnnouncement = require("../Functionalities/MakeAnnouncement");
// Get all faculty details

router.get('/getAllFacultyDetails', async (req, res) => {
    try {
        const allFacultyDetails = await FacultyDetails.find();
        res.json(allFacultyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all Faculty Emails

router.get("/getAllFacultyEmails", async (req, res) => {
    try {
        const facultyEmails = await FacultyDetails.find().distinct("faculty_email");
        res.json(facultyEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific faculty details

router.get('/getSpecificFacultyDetails/:faculty_id', async (req, res) => {
    try {
        const specificFacultyDetails = await FacultyDetails.findOne({ faculty_id: req.params.faculty_id });
        res.json(specificFacultyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all faculty details by department

router.get('/getAllFacultyDetailsByDepartment/:faculty_department', async (req, res) => {

    try {
        const allFacultyDetailsByDepartment = await FacultyDetails.find({ faculty_department: req.params.faculty_department });
        res.json(allFacultyDetailsByDepartment);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all faculty details by designation

router.get('/getAllFacultyDetailsByDesignation/:faculty_designation', async (req, res) => {

    try {
        const allFacultyDetailsByDesignation = await FacultyDetails.find({ faculty_designation: req.params.faculty_designation });
        res.json(allFacultyDetailsByDesignation);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all faculty details by department and designation

router.get('/getAllFacultyDetailsByDepartmentAndDesignation/:faculty_department/:faculty_designation', async (req, res) => {

    try {
        const allFacultyDetailsByDepartmentAndDesignation = await FacultyDetails.find({ faculty_department: req.params.faculty_department, faculty_designation: req.params.faculty_designation });
        res.json(allFacultyDetailsByDepartmentAndDesignation);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Student Details

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

router.get("/getStudentByStudentCode", async (req, res) => {
    try {
        const studentDetails = await StudentDetails.find(
            {
                student_code: req.body.student_code
            }
        );
        
        const studentGuardianInfo = await StudentGuardianInfo.find(
            {
                student_id: studentDetails[0]._id
            }
        );

        const studentOtherDetails = await StudentOtherDetails.find(
            {
                student_id: studentDetails[0]._id
            }   
        );

        const studentContactInfo = await StudentContactInfo.find(
            {
                student_id: studentDetails[0]._id
            }   
        );

        const studentAcademicInfo = await StudentAcademicInfo.find(
            {
                student_id: studentDetails[0]._id
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
        res.json({
            message: err
        });
    }
}
);


// Get All Students by session

router.get("/getAllStudentsBySession", async (req, res) => {
    try {
        const studentDetails = await StudentDetails.find(
            {
                session: req.body.session_number
            }
        );
        const studentGuardianInfo = await StudentGuardianInfo.find(
            {
                session: studentDetails[0].session
            }
        );
        const studentOtherDetails = await StudentOtherDetails.find(
            {
                session: studentDetails[0].session
            }
        );
        const studentContactInfo = await StudentContactInfo.find(
            {
                session: studentDetails[0].session
            }
        );
        const studentAcademicInfo = await StudentAcademicInfo.find(
            {
                session: studentDetails[0].session
            }
        );
    }   
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Get Course for current semester

router.get("/getCourseForCurrentSemester", async (req, res) => {
    try {
        const courseDetails = await CourseDetails.find(
            {
                semester: req.body.semester
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

// Create Student Exam Result

router.patch("/createStudentExamResult", async (req, res) => {
    console.log(req.body);
    try {
        const studentExamResult = new StudentExamResult(
            {
                    student_id: req.body.student_id,
                    semester: req.body.semester,
                    batch_year : req.body.batch_year,
                    subject_code: (req.body.subject_code)?.split(","),
                    subject_name: (req.body.subject_name)?.split(","),
                    sessional1_marks: (req.body.sessional1_marks)?.split(","),
                    sessional2_marks: (req.body.sessional2_marks)?.split(","),
                    sessional3_marks: (req.body.sessional3_marks)?.split(","),
                    sessional1_present: (req.body.sessional1_present)?.split(","),
                    sessional2_present: (req.body.sessional2_present)?.split(","),
                    sessional3_present: (req.body.sessional3_present)?.split(","),
                    sessional1_attendance: (req.body.sessional1_attendance)?.split(","),
                    sessional2_attendance: (req.body.sessional2_attendance)?.split(","),
                    sessional3_attendance: (req.body.sessional3_attendance)?.split(","),
                    sessional1_total_attendance: (req.body.sessional1_total_attendance)?.split(","),
                    sessional2_total_attendance: (req.body.sessional2_total_attendance)?.split(","),
                    sessional3_total_attendance: (req.body.sessional3_total_attendance)?.split(","),
                    sessional1_practical_attendance: (req.body.sessional1_practical_attendance)?.split(","),
                    sessional2_practical_attendance: (req.body.sessional2_practical_attendance)?.split(","),
                    sessional3_practical_attendance: (req.body.sessional3_practical_attendance)?.split(","),
                    sessional1_total_practical_attendance: (req.body.sessional1_total_practical_attendance)?.split(","),
                    sessional2_total_practical_attendance: (req.body.sessional2_total_practical_attendance)?.split(","),
                    sessional3_total_practical_attendance: (req.body.sessional3_total_practical_attendance)?.split(","),
                    block_marks: (req.body.block_marks)?.split(","),
                    block_present: (req.body.block_present)?.split(","),
                    external_marks: (req.body.external_marks)?.split(","),
                    external_status: (req.body.external_status)?.split(","),
                    avg_sessional_marks: (req.body.avg_sessional_marks)?.split(","),
                    sessional_status: (req.body.sessional_status)?.split(","),
                    avg_practical_marks: (req.body.avg_practical_marks)?.split(","),
                    practical_status: (req.body.practical_status)?.split(","),
                    termwork_marks: (req.body.termwork_marks)?.split(","),
                    termwork_status: (req.body.termwork_status)?.split(","),
                    total_marks: (req.body.total_marks)?.split(","),
                    max_total_marks: (req.body.max_total_marks)?.split(","),
                    subject_points: (req.body.subject_points)?.split(","),
                    subject_grade: (req.body.subject_grade)?.split(","),
                    subject_credit: (req.body.subject_credit)?.split(","),
                    subject_status: (req.body.subject_status)?.split(","),
                    spi_credit: req.body.spi_credit,
                    spi_points: req.body.spi_points,
                    spi: req.body.spi,
                    cpi_credit: req.body.cpi_credit,
                    cpi_points: req.body.cpi_points,
                    cpi: req.body.cpi,
                    result_status : req.body.result_status
            }
        );
        console.log(studentExamResult);
        await studentExamResult.save();
        res.json({
            message : "Exam Result Created Successfully"
        });
    }
    catch (err) {
        console.error(err); // Log the error
        res.status(500).json({
            message: "An error occurred while creating the exam result."
        });
    }
}
);


// Update Student Exam Result 

router.patch("/updateStudentExamResult", async (req, res) => {
    try {
        const updatedStudentExamResult = await StudentExamResult.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    student_id: req.body.student_id,
                    semester: req.body.semester,
                    batch_year : req.body.batch_year,
                    subject_code: req.body.subject_code,
                    subject_name: req.body.subject_name,
                    semester: req.body.semester,
                    sessional1_marks: req.body.sessional1_marks,
                    sessional2_marks: req.body.sessional2_marks,
                    sessional3_marks: req.body.sessional3_marks,
                    sessional1_present: req.body.sessional1_present,
                    sessional2_present: req.body.sessional2_present,
                    sessional3_present: req.body.sessional3_present,
                    sessional1_attendance: req.body.sessional1_attendance,
                    sessional2_attendance: req.body.sessional2_attendance,
                    sessional3_attendance: req.body.sessional3_attendance,
                    sessional1_total_attendance: req.body.sessional1_total_attendance,
                    sessional2_total_attendance: req.body.sessional2_total_attendance,
                    sessional3_total_attendance: req.body.sessional3_total_attendance,
                    sessional1_practical_attendance: req.body.sessional_practical_attendance,
                    sessional2_practical_attendance: req.body.sessional2_practical_attendance,
                    sessional3_practical_attendance: req.body.sessional3_practical_attendance,
                    sessional1_total_practical_attendance: req.body.sessional1_total_practical_attendance,
                    sessional2_total_practical_attendance: req.body.sessional2_total_practical_attendance,
                    sessional3_total_practical_attendance: req.body.sessional3_total_practical_attendance,
                    block_marks: req.body.block_marks,
                    block_present: req.body.block_present,
                    external_marks: req.body.external_marks,
                    external_status: req.body.external_status,
                    avg_sessional_marks: req.body.avg_sessional_marks,
                    sessional_status: req.body.sessional_status,
                    avg_practical_marks: req.body.avg_practical_marks,
                    practical_status: req.body.practical_status,
                    termwork_marks: req.body.termwork_marks,
                    termwork_status: req.body.termwork_status,
                    total_marks: req.body.total_marks,
                    max_total_marks: req.body.max_total_marks,
                    subject_points: req.body.subject_points,
                    subject_grade: req.body.subject_grade,
                    subject_credit: req.body.subject_credit,
                    subject_status: req.body.subject_status,
                    spi_credit: req.body.spi_credit,
                    spi_points: req.body.spi_points,
                    spi: req.body.spi,
                    cpi_credit: req.body.cpi_credit,
                    cpi_points: req.body.cpi_points,
                    cpi: req.body.cpi,
                    result_status : req.body.result_status
                }
            }
        );
        res.json(updatedStudentExamResult);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Result of Specific Student Id and Specific Semester

router.patch("/updateStudentExamResultSem/:semester/:student_id", async (req, res) => {
    try {
        const updatedStudentExamResult = await StudentExamResult.updateOne(
            {
                student_id: req.params.student_id,
                semester: req.params.semester
            },
            {
                $set: {
                    student_id: req.params.student_id,
                    semester: req.params.semester,
                    subject_code: req.body.subject_code,
                    subject_name: req.body.subject_name,
                    sessional1_marks: req.body.sessional1_marks,
                    sessional2_marks: req.body.sessional2_marks,
                    sessional3_marks: req.body.sessional3_marks,
                    sessional1_present: req.body.sessional1_present,
                    sessional2_present: req.body.sessional2_present,
                    sessional3_present: req.body.sessional3_present,
                    sessional1_attendance: req.body.sessional1_attendance,
                    sessional2_attendance: req.body.sessional2_attendance,
                    sessional3_attendance: req.body.sessional3_attendance,
                    sessional1_total_attendance: req.body.sessional1_total_attendance,
                    sessional2_total_attendance: req.body.sessional2_total_attendance,
                    sessional3_total_attendance: req.body.sessional3_total_attendance,
                    sessional1_practical_attendance: req.body.sessional_practical_attendance,
                    sessional2_practical_attendance: req.body.sessional2_practical_attendance,
                    sessional3_practical_attendance: req.body.sessional3_practical_attendance,
                    sessional1_total_practical_attendance: req.body.sessional1_total_practical_attendance,
                    sessional2_total_practical_attendance: req.body.sessional2_total_practical_attendance,
                    sessional3_total_practical_attendance: req.body.sessional3_total_practical_attendance,
                    block_marks: req.body.block_marks,
                    block_present: req.body.block_present,
                    external_marks: req.body.external_marks,
                    external_status: req.body.external_status,
                    avg_sessional_marks: req.body.avg_sessional_marks,
                    sessional_status: req.body.sessional_status,
                    avg_practical_marks: req.body.avg_practical_marks,
                    practical_status: req.body.practical_status,
                    termwork_marks: req.body.termwork_marks,
                    termwork_status: req.body.termwork_status,
                    total_marks: req.body.total_marks,
                    max_total_marks: req.body.max_total_marks,
                    subject_points: req.body.subject_points,
                    subject_grade: req.body.subject_grade,
                    subject_credit: req.body.subject_credit,
                    subject_status: req.body.subject_status,
                    spi_credit: req.body.spi_credit,
                    spi_points: req.body.spi_points,
                    spi: req.body.spi,
                    cpi_credit: req.body.cpi_credit,
                    cpi_points: req.body.cpi_points,
                    cpi: req.body.cpi,
                    result_status: req.body.result_status
                }
            }
        );
        res.json(updatedStudentExamResult);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


router.use("/", require("../Functionalities/MakeAnnouncement"));
module.exports = router;