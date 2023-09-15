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
const FacultyDetails = require('../Models/FacultyDetails');
const TTODetails = require("../Models/TTODetails");
const TPODetails = require("../Models/TPODetails");
const AdminDetails = require("../Models/AdminDetails");
const MakeAnnouncement = require("../Functionalities/MakeAnnouncement");
const AdminService = require("../Services/Admin_Service");

router.use(express.json());

// Admin Section ---------------------------------------------

// Get Admin Details
router.get('/getAdminDetails/:admin_id', async (req, res) => {
    const response = await AdminService.getAdminDetailsById(req.params.admin_id);
    res.json(response);
});

// Get all Admin Details
router.get('/getAllAdminDetails', async (req, res) => {

    try {
        const allAdminDetails = await AdminDetails.find();
        res.json(allAdminDetails);
    } catch (err) {
        res.json({ message: err });
    }
});

// TPO Section ---------------------------------------------

// Create New TPO

router.post("/createTPO", async (req, res) => {

    try {
        const tpoDetails = await TPODetails.create({
            tpo_id: req.body.tpo_id,
            tpo_name: req.body.tpo_name,
            tpo_email: req.body.tpo_email,
            tpo_mobile_number: req.body.tpo_mobile_number,
            tpo_experience: req.body.tpo_experience,
            tpo_qualification: req.body.tpo_qualification,
            tpo_designation: req.body.tpo_designation,
            tpo_department: req.body.tpo_department,
        }
        );
        res.json({
            message: "TPO Created Successfully"
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update TPO

router.patch("/updateTPO", async (req, res) => {

    try {
        const updateTPO = await TPODetails.updateOne(
            {
                tpo_id: req.body.tpo_id
            },
            {
                $set: {
                    tpo_name: req.body.tpo_name,
                    tpo_email: req.body.tpo_email,
                    tpo_mobile_number: req.body.tpo_mobile_number,
                    tpo_experience: req.body.tpo_experience,
                    tpo_qualification: req.body.tpo_qualification,
                    tpo_designation: req.body.tpo_designation,
                    tpo_department: req.body.tpo_department,
                }
            }
        );
        res.json(updateTPO);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Delete TPO

router.delete("/deleteTPO", async (req, res) => {

    try {
        const deleteTPO = await TPODetails.deleteOne(
            {
                tpo_id: req.body.tpo_id
            }
        );
        res.json({
            message: "TPO Deleted Successfully"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

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

// Get TPO details by department

router.get('/getTPODetailsByDepartment/:tpo_department', async (req, res) => {

    try {
        const tpoDetailsByDepartment = await TPODetails.find({ tpo_department: req.params.tpo_department });
        res.json(tpoDetailsByDepartment);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get TPO details by designation

router.get('/getTPODetailsByDesignation/:tpo_designation', async (req, res) => {

    try {
        const tpoDetailsByDesignation = await TPODetails.find({ tpo_designation: req.params.tpo_designation });
        res.json(tpoDetailsByDesignation);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Faculty Section ---------------------------------------------

// Add a faculty details

router.post('/addFacultyDetails', async (req, res) => {
    const facultyDetails = new FacultyDetails({
        faculty_id: req.body.faculty_id,
        faculty_name: req.body.faculty_name,
        faculty_email: req.body.faculty_email,
        faculty_mobile_number: req.body.faculty_mobile_number,
        faculty_experience: req.body.faculty_experience,
        faculty_qualification: req.body.faculty_qualification,
        faculty_designation: req.body.faculty_designation,
        faculty_department: req.body.faculty_department,
    });

    try {
        const savedFacultyDetails = await facultyDetails.save();
        res.json(savedFacultyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Update a faculty details

router.patch('/updateFacultyDetails/:faculty_id', async (req, res) => {

    try {
        const updatedFacultyDetails = await FacultyDetails.updateOne(
            { faculty_id: req.params.faculty_id },
            {
                $set: {
                    faculty_name: req.body.faculty_name,
                    faculty_email: req.body.faculty_email,
                    faculty_mobile_number: req.body.faculty_mobile_number,
                    faculty_experience: req.body.faculty_experience,
                    faculty_qualification: req.body.faculty_qualification,
                    faculty_designation: req.body.faculty_designation,
                    faculty_department: req.body.faculty_department,
                }
            }
        );
        res.json(updatedFacultyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Delete a faculty details

router.delete('/deleteFacultyDetails/:faculty_id', async (req, res) => {
    try {
        const deletedFacultyDetails = await FacultyDetails.deleteOne({ faculty_id: req.params.faculty_id });
        res.json(deletedFacultyDetails);
    } catch (err) {
        res.json({ message: err });
    }
}
);


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

// TTO Section ---------------------------------------------

// Create New TTO

router.post("/createTTO", async (req, res) => {

    try {

        await TTODetails.create({
            tto_id: req.body.tto_id,
            tto_name: req.body.tto_name,
            tto_email: req.body.tto_email,
            tto_mobile_number: req.body.tto_mobile_number,
            tto_experience: req.body.tto_experience,
            tto_qualification: req.body.tto_qualification,
            tto_designation: req.body.tto_designation,
            tto_department: req.body.tto_department,
        });

        res.json({
            message: "TTO Created Successfully"
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update TTO

router.patch("/updateTTO", async (req, res) => {

    try {
        const updateTTO = await TTODetails.updateOne(
            {
                tto_id: req.body.tto_id
            },
            {
                $set: {
                    tto_name: req.body.tto_name,
                    tto_email: req.body.tto_email,
                    tto_mobile_number: req.body.tto_mobile_number,
                    tto_experience: req.body.tto_experience,
                    tto_qualification: req.body.tto_qualification,
                    tto_designation: req.body.tto_designation,
                    tto_department: req.body.tto_department,
                }
            }
        );
        res.json(updateTTO);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Delete TTO

router.delete("/deleteTTO", async (req, res) => {

    try {
        const deleteTTO = await TTODetails.deleteOne(
            {
                tto_id: req.body.tto_id
            }
        );
        res.json({
            message: "TTO Deleted Successfully"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

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


// Course Section ---------------------------------------------

// Create Course Details

router.post("/createCourseDetails", async (req, res) => {

    try {
        await CourseDetails.create(
            {
                subject_code: req.body.subject_code,
                subject_name: req.body.subject_name,
                subject_credit: req.body.subject_credit,
                subject_alias: req.body.subject_alias,
                semester: req.body.semester,
                theory_min_passing_marks: req.body.theory_min_passing_marks,
                theory_min_passing_marks2: req.body.theory_min_passing_marks2,
                theory_total_marks: req.body.theory_total_marks,
                sessional_min_passing_marks: req.body.sessional_min_passing_marks,
                sessional_min_passing_marks2: req.body.sessional_min_passing_marks2,
                sessional_total_marks: req.body.sessional_total_marks,
                practical_min_passing_marks: req.body.practical_min_passing_marks,
                practical_min_passing_marks2: req.body.practical_min_passing_marks2,
                practical_total_marks: req.body.practical_total_marks,
                isElective: Boolean(req.body.isElective),
            }
        );
        res.json({
            message: "Course Details Created Successfully"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Course Details

router.patch("/updateCourseDetails", async (req, res) => {

    try {
        const updateCourseDetails = await CourseDetails.updateOne(
            {
                subject_code: req.body.subject_code
            },
            {
                $set: {
                    subject_name: req.body.subject_name,
                    subject_credit: req.body.subject_credit,
                    subject_alias: req.body.subject_alias,
                    semester: req.body.semester ,
                    theory_min_passing_marks: req.body.theory_min_passing_marks ,
                    theory_min_passing_marks2: req.body.theory_min_passing_marks2,
                    theory_total_marks: req.body.theory_total_marks,
                    sessional_min_passing_marks: req.body.sessional_min_passing_marks,
                    sessional_min_passing_marks2: req.body.sessional_min_passing_marks2,
                    sessional_total_marks: req.body.sessional_total_marks,
                    practical_min_passing_marks: req.body.practical_min_passing_marks,
                    practical_min_passing_marks2: req.body.practical_min_passing_marks2,
                    practical_total_marks: req.body.practical_total_marks,
                    isElective: req.body.isElective,
                }
            }
        );
        res.json(updateCourseDetails);
    } 
    catch (err) {
        res.status(500).json({
            message: "Error updating course details.",
            error: err.message,
          });
    }
}
);

// Delete Course Details

router.delete("/deleteCourseDetails", async (req, res) => {

    try {
        const deleteCourseDetails = await CourseDetails.deleteOne(
            {
                subject_code: req.body.subject_code
            }
        );
        res.json({
            message: "Course Details Deleted Successfully"
        });
    } catch (err) {
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

// Student Section ---------------------------------------------

// Create New Student

router.post("/createStudent", async (req, res) => {

    try {
        await StudentDetails.create(
            {
                reporting_date: req.body.reporting_date,
                admission_type: req.body.admission_type,
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                name_format: req.body.name_format,
                full_name: req.body.full_name,
                gender: req.body.gender,
                date_of_birth: req.body.date_of_birth,
                birth_place: req.body.birth_place,
                ACPC_seat_allotment_date: req.body.ACPC_seat_allotment_date,
                isD2D: Boolean(req.body.isD2D) ,
                enrollment_year: req.body.enrollment_year,
                degree: req.body.degree,
                qualifying_exam_roll_number: req.body.qualifying_exam_roll_number,
                session_number: req.body.session_number * 1,
                batch_year: req.body.batch_year,
                student_id: req.body.student_id,
                old_student_id: req.body.old_student_id,
                merit_rank: req.body.merit_rank,
                cast_category: req.body.cast_category,
                student_email: req.body.student_email,
                student_roll_number: req.body.student_roll_number,
            }
        );

        await StudentGuardianInfo.create(
            {
                student_id: req.body.student_id,
                father_name: req.body.father_name,
                father_occuption: req.body.father_occuption,
                organization_name: req.body.organization_name,
                annual_income: req.body.annual_income,
            }
        );

        await StudentOtherDetails.create(
            {
                student_id: req.body.student_id,
                sub_cast: req.body.sub_cast,
                merital_status: req.body.merital_status,
                mother_tongue: req.body.mother_tongue,
                nationality: req.body.nationality,
                blood_group: req.body.blood_group,
            }
        );

        await StudentContactInfo.create(
            {
                student_id: req.body.student_id,
                address_line_1: req.body.address_line_1,
                address_line_2: req.body.address_line_2,
                address_line_3: req.body.address_line_3,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                state: req.body.state,
                mobile_number: req.body.mobile_number,
                alternate_mobile_number: req.body.alternate_mobile_number,
                email: req.body.email,
                local_address_line_1: req.body.local_address_line_1,
                local_address_line_2: req.body.local_address_line_2,
                local_address_line_3: req.body.local_address_line_3,
                local_city: req.body.local_city,
            }
        );

        await StudentAcademicInfo.create(
            {
                student_id: req.body.student_id,
                medium_of_exam: req.body.medium_of_exam,
                seat_number: req.body.seat_number,
                passing_year: req.body.passing_year,
                passing_month: req.body.passing_month,
                board: req.body.board,
                institute_name: req.body.institute_name,
                result_type: req.body.result_type,
                result: req.body.result,
            }
        );
        res.json({
            message: "Student Created Successfully"
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }

    

}
);


// Update Student

router.patch("/updateStudent", async (req, res) => {

    try {
        const updateStudent = await StudentDetails.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    reporting_date: req.body.reporting_date,
                    admission_type: req.body.admission_type,
                    first_name: req.body.first_name,
                    middle_name: req.body.middle_name,
                    last_name: req.body.last_name,
                    name_format: req.body.name_format,
                    full_name: req.body.full_name,
                    gender: req.body.gender,
                    date_of_birth: req.body.date_of_birth,
                    birth_place: req.body.birth_place,
                    ACPC_seat_allotment_date: req.body.ACPC_seat_allotment_date,
                    isD2D: Boolean(req.body.isD2D),
                    enrollment_year: req.body.enrollment_year,
                    degree: req.body.degree,
                    qualifying_exam_roll_number: req.body.qualifying_exam_roll_number,
                    session_number: req.body.session_number * 1,
                    batch_year: req.body.batch_year,
                    student_id: req.body.student_id,
                    old_student_id: req.body.old_student_id,
                    merit_rank: req.body.merit_rank,
                    cast_category: req.body.cast_category,
                    student_email: req.body.student_email,
                    student_roll_number: req.body.student_roll_number,
                }
            }
        );

        
        const updateStudentGuardianInfo = await StudentGuardianInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    father_name: req.body.father_name,
                    father_occuption: req.body.father_occuption,
                    organization_name: req.body.organization_name,
                    annual_income: req.body.annual_income,
                }
            }
        );

        const updateStudentOtherDetails = await StudentOtherDetails.updateOne(
            {
                student_id: req.body.student_id
            },
            {

                $set: {
                    sub_cast: req.body.sub_cast,
                    merital_status: req.body.merital_status,
                    mother_tongue: req.body.mother_tongue,
                    nationality: req.body.nationality,
                    blood_group: req.body.blood_group,
                }
            }
        );

        const updateStudentContactInfo = await StudentContactInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    address_line_1: req.body.address_line_1,
                    address_line_2: req.body.address_line_2,
                    address_line_3: req.body.address_line_3,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    pincode: req.body.pincode,
                    state: req.body.state,
                    mobile_number: req.body.mobile_number,
                    alternate_mobile_number: req.body.alternate_mobile_number,
                    email: req.body.email,
                    local_address_line_1: req.body.local_address_line_1,
                    local_address_line_2: req.body.local_address_line_2,
                    local_address_line_3: req.body.local_address_line_3,
                    local_city: req.body.local_city,
                }
            }
        );
        
        const updateStudentAcademicInfo = await StudentAcademicInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    medium_of_exam: req.body.medium_of_exam,
                    seat_number: req.body.seat_number,
                    passing_year: req.body.passing_year,
                    passing_month: req.body.passing_month,
                    board: req.body.board,
                    institute_name: req.body.institute_name,
                    result_type: req.body.result_type,
                    result: req.body.result,
                }
            }
        );

        res.json({
            message: "Student Updated Successfully"
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Student Details

router.patch("/updateStudentDetails", async (req, res) => {

    try {
        const updateStudent = await StudentDetails.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    reporting_date: req.body.reporting_date,
                    admission_type: req.body.admission_type,
                    first_name: req.body.first_name,
                    middle_name: req.body.middle_name,
                    last_name: req.body.last_name,
                    name_format: req.body.name_format,
                    full_name: req.body.full_name,
                    gender: req.body.gender,
                    date_of_birth: req.body.date_of_birth,
                    birth_place: req.body.birth_place,
                    ACPC_seat_allotment_date: req.body.ACPC_seat_allotment_date,
                    isD2D: Boolean(req.body.isD2D),
                    enrollment_year: req.body.enrollment_year,
                    degree: req.body.degree,
                    qualifying_exam_roll_number: req.body.qualifying_exam_roll_number,
                    session_number: req.body.session_number * 1,
                    batch_year: req.body.batch_year,
                    student_id: req.body.student_id,
                    old_student_id: req.body.old_student_id,
                    merit_rank: req.body.merit_rank,
                    cast_category: req.body.cast_category,
                    student_email: req.body.student_email,
                }
            }
        );
        res.json(updateStudent);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Student Guardian Info

router.patch("/updateStudentGuardianInfo", async (req, res) => {

    try {
        const updateStudentGuardianInfo = await StudentGuardianInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    father_name: req.body.father_name,
                    father_occuption: req.body.father_occuption,
                    organization_name: req.body.organization_name,
                    annual_income: req.body.annual_income,
                }
            }
        );
        res.json(updateStudentGuardianInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Student Other Details

router.patch("/updateStudentOtherDetails", async (req, res) => {

    try {
        const updateStudentOtherDetails = await StudentOtherDetails.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    sub_cast: req.body.sub_cast,
                    merital_status: req.body.merital_status,
                    mother_tongue: req.body.mother_tongue,
                    nationality: req.body.nationality,
                    blood_group: req.body.blood_group,
                }
            }
        );
        res.json(updateStudentOtherDetails);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Update Student Contact Info

router.patch("/updateStudentContactInfo", async (req, res) => {

    try {
        const updateStudentContactInfo = await StudentContactInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    address_line_1: req.body.address_line_1,
                    address_line_2: req.body.address_line_2,
                    address_line_3: req.body.address_line_3,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    pincode: req.body.pincode,
                    mobile_number: req.body.mobile_number,
                    alternate_mobile_number: req.body.alternate_mobile_number,
                    email: req.body.email,
                    local_address_line_1: req.body.local_address_line_1,
                    local_address_line_2: req.body.local_address_line_2,
                    local_address_line_3: req.body.local_address_line_3,
                    local_city: req.body.local_city
                }
            }
        );
        res.json(updateStudentContactInfo);
    } catch (err) {
        res.json({
            message: err
        });
    } 
}
);

// Update Student Academic Info

router.patch("/updateStudentAcademicInfo", async (req, res) => {

    try {
        const updateStudentAcademicInfo = await StudentAcademicInfo.updateOne(
            {
                student_id: req.body.student_id
            },
            {
                $set: {
                    medium_of_exam: req.body.medium_of_exam,
                    seat_number: req.body.seat_number,
                    passing_year: req.body.passing_year,
                    passing_month: req.body.passing_month,
                    board: req.body.board,
                    institute_name: req.body.institute_name,
                    result_type: req.body.result_type,
                    result: req.body.result,
                }
            }
        );
        res.json(updateStudentAcademicInfo);
    } catch (err) {
        res.json({
            message: err
        });
    }
}
);

// Delete Student

router.delete("/deleteStudent", async (req, res) => {
    try {
        const deleteStudent = await StudentDetails.deleteOne(
            {
                student_code: req.body.student_code
            }
        );
        res.json({
            message: "Student Deleted Successfully"
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

router.use("/", require("../Functionalities/MakeAnnouncement"));

module.exports = router;