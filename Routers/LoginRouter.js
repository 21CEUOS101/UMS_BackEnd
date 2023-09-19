const express = require('express');
const bcrypt = require('bcrypt');
const LoginRouter = express.Router();
const StudentContactInfo = require("../Models/StudentModel/StudentContactInfo");
const FacultyDetails = require('../Models/FacultyDetails');
const TTODetails = require("../Models/TTODetails");
const TPODetails = require("../Models/TPODetails");
const AdminDetails = require("../Models/AdminDetails");
const LocalStorage = require('node-localstorage').LocalStorage;
const LoginModel = require('../Models/Login_Auth/LoginModel');

global.localStorage = new LocalStorage('./scratch');

LoginRouter.post('/', async (req, res) => {
    const { user_id, role, password } = req.body;
    console.log(req.body);
    try {
        // Find the user based on the provided user_id
        const login = await LoginModel.findOne({ user_id });

        if (login) {
            // Compare the provided password with the hashed password from the database
            const isMatch = await bcrypt.compare(password, login.password);
            console.log(isMatch);

            if (isMatch) {

                req.session.role = role;
                req.session.user_id = user_id;
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('role', role);
                localStorage.setItem('secret-key', req.body.key);

                if (role === 'student') {
                    const Student = await StudentContactInfo.find({ student_id: user_id });
                    req.session.email = Student.email;
                    localStorage.setItem('email', Student.email);
                }
                else if (role === 'faculty') {
                    const Faculty = await FacultyDetails.find({ faculty_id: user_id });
                    req.session.email = Faculty.faculty_email;
                    localStorage.setItem('email', Faculty.faculty_email);
                }
                else if (role === 'tto') {
                    const TTO = await TTODetails.find({ tto_id: user_id });
                    req.session.email = TTO.tto_email;
                    localStorage.setItem('email', TTO.tto_email);
                }
                else if (role === 'tpo') {
                    const TPO = await TPODetails.find({ tpo_id: user_id });
                    req.session.email = TPO.tpo_email;
                    localStorage.setItem('email', TPO.tpo_email);
                }
                else if (role === 'admin') {
                    const Admin = await AdminDetails.find({ admin_id: user_id });
                    req.session.email = Admin.admin_email;
                    localStorage.setItem('email', Admin.admin_email);
                }
                else if (role === 'hod') {
                    const HOD = await FacultyDetails.find({ faculty_id: user_id });
                    req.session.email = HOD.faculty_email;
                    localStorage.setItem('email', HOD.faculty_email);
                }

                console.log("Successfully logged in");
                // Login successful
                res.json({
                    status: 'success',
                    message: 'Login successful',
                    isLoggedIn: true,
                    role: login.role,  // Assuming the user's role is stored in the database
                });
            } else {
                // Invalid credentials
                res.json({
                    status: 'error',
                    message: 'Invalid credentials',
                    isLoggedIn: false,
                });
            }
        } else {
            // User not found (Invalid credentials)
            res.json({
                status: 'error',
                message: 'Invalid credentials',
                isLoggedIn: false,
            });
        }
    } catch (error) {
        // Server error
        res.json({
            status: 'error',
            message: 'Server error',
            isLoggedIn: false,
        });
    }
});

module.exports = LoginRouter;
