const express = require('express');
const router = express.Router();
const HODDetails = require('../Models/HODDetails');

// Student Imports
const StudentDetails = require("../Models/StudentModel/StudentDetails");
const StudentGuardianInfo = require("../Models/StudentModel/StudentGuardianInfo");
const StudentExamResult = require("../Models/StudentModel/StudentExamResult");
const StudentOtherDetails = require("../Models/StudentModel/StudentOtherDetails");
const StudentFeesInfo = require("../Models/StudentModel/StudentFeesInfo");
const StudentAcademicInfo = require("../Models/StudentModel/StudentAcademicInfo");
const StudentContactInfo = require("../Models/StudentModel/StudentContactInfo");
// Faculty Imports
const FacultyDetails = require('../Models/FacultyDetails');
// Course Imports
const CourseDetails = require("../Models/StudentModel/CourseDetails");
// Placement Imports
const Placement_CompanyDetails = require('../Models/ComponentModel/Placement_CompanyDetails');
const TPODetails = require("../Models/TPODetails");
// TTO Imports
const TimeTableBlock = require('../Models/ComponentModel/TimeTableBlock');
const TTODetails = require("../Models/TTODetails");
// Admin Imports
const AdminDetails = require("../Models/AdminDetails");
const generatePassword = require("./generatePassword");
const LoginSchema = require("../Models/Login_Auth/LoginModel");

// add new Admin
router.post('/addNewAdmin', async (req, res) => {

    try {

        const check = await AdminDetails.find({ admin_id: req.body.admin_id });
        if (check?.length > 0) {
            res.json({
                message: "Admin already exists"
            });
            return;
        }
        else if(AdminDetails === null || req.body === undefined)
        {
            res.json({
                message: "Admin Details not found"
            });
        }
        const adminDetails = new AdminDetails({
            admin_id: req.body.admin_id,
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            admin_mobile_number: req.body.admin_mobile_number,
            admin_designation: req.body.admin_designation,
            admin_department: req.body.admin_department
        });
        const savedAdminDetails = await adminDetails.save();
                // Create Login Credentials
                const password = generatePassword(10);
        
                const login = new LoginSchema({
                    user_id: adminDetails.admin_id,
                    role: "admin",
                    password: password,
                });
                await login.save();
                // Login successful
        res.json({
            message: "Admin Details Added Successfully",
            id: req.body.admin_id,
            email: req.body.admin_email,
            password : password
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// update Admin

router.patch('/updateAdmin', async (req, res) => {

    try {
        const updatedAdminDetails = await AdminDetails.updateOne(
            { admin_id: req.body.admin_id },
            {
                $set: {
                    admin_name: req.body.admin_name,
                    admin_email: req.body.admin_email,
                    admin_mobile_number: req.body.admin_mobile_number,
                    admin_designation: req.body.admin_designation,
                    admin_department: req.body.admin_department
                }
            }
        );
        res.json(updatedAdminDetails);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// get Admin by admin_id

router.get('/getAdminByAdminId/:admin_id', async (req, res) => {

    try {
        const adminDetails = await AdminDetails.find({
            admin_id: req.params.admin_id
        });
        res.json(adminDetails);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// get all Admins

router.get('/getAllAdmins', async (req, res) => {

    try {
        const adminDetails = await AdminDetails.find();
        res.json(adminDetails);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Delete Admin by admin_id

router.delete('/delete-admin/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        await AdminDetails.deleteOne({ admin_id: req.params.id });
        res.json({
            message: "Admin Deleted Successfully"
        });
    } catch (err) {
        res.json({
            message: err
        }); 
    }
}
);

// Get HOD details by id

router.get('/getHODDetails/:hod_id', async (req, res) => {
    try {
        const hodDetails = await HODDetails.findOne({ hod_id: req.params.hod_id });
        res.json(hodDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get All HOD details

router.get('/getAllHOD', async (req, res) => {

    try {
        const hodDetails = await HODDetails.find();
        res.json(hodDetails);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Create HOD details

router.post('/addNewHOD', async (req, res) => {

    try {

        const check = await HODDetails.find({ hod_id: req.body.hod_id });
        if (check?.length > 0) {
            console.log(check);
            res.json({
                message: "HOD already exists"
            });
            return;
        }
        else if (HODDetails === null || req.body === undefined) {
            res.json({
                message: "HOD Details not found"
            });
            return;
        }
        const hodDetails = new HODDetails({
            hod_id: req.body.hod_id,
            hod_name: req.body.hod_name,
            hod_email: req.body.hod_email,
            hod_mobile_number: req.body.hod_mobile_number,
            hod_experience: req.body.hod_experience,
            hod_qualification: req.body.hod_qualification,
            hod_designation: req.body.hod_designation,
            hod_department: req.body.hod_department,
        });
        const savedHODDetails = await hodDetails.save();
                // Create Login Credentials
                const password = generatePassword(10);
        
                const login = new LoginSchema({
                    user_id: savedHODDetails.hod_id,
                    role: "hod",
                    password: password,
                });
                await login.save();
                // Login successful
        res.json({
            message: "HOD Details Added Successfully",
            id: req.body.hod_id,
            email: req.body.hod_email,
            password : password
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
});

// Get all HOD Emails

router.get("/getAllHODEmails", async (req, res) => {
    try {
        const hodEmails = await HODDetails.find().distinct("hod_email");
        res.json(hodEmails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update HOD details by id

router.patch('/updateHODDetails', async (req, res) => {
        console.log(req.body);
        try {
            const updatedHODDetails = await HODDetails.updateOne(
                { hod_id: req.body.hod_id },
                {
                    $set: {
                        hod_name: req.body.hod_name,
                        hod_email: req.body.hod_email,
                        hod_mobile_number: req.body.hod_mobile_number,
                        hod_experience: req.body.hod_experience,
                        hod_qualification: req.body.hod_qualification,
                        hod_designation: req.body.hod_designation,
                        hod_department: req.body.hod_department,
                    }
                }
            );
            console.log(updatedHODDetails);
            res.json(updatedHODDetails);
        } catch (err) {
            res.json({ message: err });
        }
}
);

// Delete HOD by id

router.delete('/delete-hod/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        await HODDetails.deleteOne({ hod_id: req.params.id });
        res.json({
            message: "HOD Deleted Successfully"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Faculty Section 

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
}
);

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


// Student Section

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
  
// Time Table Section

// Get all time table details

router.get('/getAllTimeTableDetails', async (req, res) => {
    try {
        const allTimeTableDetails = await TimeTable.find();
        res.json(allTimeTableDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get a specific time table details

router.get('/getSpecificTimeTableDetails/:time_table_id', async (req, res) => {
    try {
        const specificTimeTableDetails = await TimeTable.findOne({ time_table_id: req.params.time_table_id });
        res.json(specificTimeTableDetails);
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

// Course Section

// Get All Course Details

router.get("/getCourseDetails", async (req, res) => {

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

// Get Course by semester

router.get("/getCourseBySemester", async (req, res) => {

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

// TTO Section

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

// TPO Section

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

router.get('/getAllNumbers', async (req, res) => {
    const current_year = new Date().getFullYear();
    try {
        const no_of_students = await StudentDetails.find({ enrollment_year: { $gte: current_year - 4, $lte: current_year } }).countDocuments();
        const no_of_faculty = await FacultyDetails.find().countDocuments();
        const no_of_hod = await HODDetails.find().countDocuments();
        const no_of_tto = await TTODetails.find().countDocuments();
        const no_of_tpo = await TPODetails.find().countDocuments();
        const no_of_admin = await AdminDetails.find().countDocuments();
        const no_of_subjects = await CourseDetails.find().countDocuments();
        const no_of_placement_companies = await Placement_CompanyDetails.distinct("placement_company_name").countDocuments();

        res.json({
            no_of_students: no_of_students,
            no_of_faculty: no_of_faculty,
            no_of_hod: no_of_hod,
            no_of_tto: no_of_tto,
            no_of_tpo: no_of_tpo,
            no_of_admin: no_of_admin,
            no_of_subjects: no_of_subjects,
            no_of_placement_companies: no_of_placement_companies
        });
    } catch (err) {
        res.json({ message: err });
    }
    
});

router.get('/getStudentCountByYear', async (req, res) => {
    
    try {
        const studentCountByYear = await StudentDetails.find({ enrollment_year: req.body.enrollment_year }).countDocuments();
        res.json(studentCountByYear);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

router.get('/getStudentCountByDepartment/:year', async (req, res) => {
    try {
        const getStudentCountByDepartment = await StudentDetails.aggregate([
            {
                $match: {
                    enrollment_year: req.params.year
                }
            },
            {
                $group: {
                    _id: "$degree",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(getStudentCountByDepartment);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// Get students no if they are D2D is not

router.get('/getStudentNumberD2D/:year', async (req, res) => {
    console.log(req.params.year);
    try {
        const getStudentNumberD2D = await StudentDetails.find({ isD2D: "true" , enrollment_year : req.params.year }).countDocuments();
        const totalStudents = await StudentDetails.find({enrollment_year : req.params.year}).countDocuments();

        res.json([{
            _id: "D2D",
            count : getStudentNumberD2D
        },
            {
                _id: "Non D2D",
                count : (totalStudents - getStudentNumberD2D)
        }
        ]);

    }
    catch (error)
    {
        res.json({
            message : error
        })
    }
});


router.use("/", require("../Functionalities/MakeAnnouncement"));
module.exports = router;