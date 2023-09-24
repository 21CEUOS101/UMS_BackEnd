const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const bodyParser = require('body-parser'); // Added bodyParser for JSON parsing
const StudentDetails = require('../Models/StudentModel/StudentDetails');
const FacultyDetails = require('../Models/FacultyDetails');
const HODDetails = require('../Models/HODDetails');
const TPODetails = require('../Models/TPODetails');
const TTODetails = require('../Models/TTODetails');
const AdminDetails = require('../Models/AdminDetails');

// Configure Nodemailer with Gmail credentials

router.use(bodyParser.json()); // Use bodyParser for JSON parsing

router.get('/getAllEmails', async (req, res) => {
  try {
    const studentEmails = StudentDetails.find().student_email;
    const facultyEmails = FacultyDetails.find().faculty_email;
    const HODEmails = HODDetails.find().hod_email;
    const TPOEmails = TPODetails.find().tpo_email;
    const TTOEmails = TTODetails.find().tto_email;
    const AdminEmails = AdminDetails.find().admin_email;

    res.status(200).json({
      studentEmails: studentEmails,
      facultyEmails: facultyEmails,
      HODEmails: HODEmails,
      TPOEmails: TPOEmails,
      TTOEmails: TTOEmails,
      AdminEmails: AdminEmails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching emails' });
  }
});

// API endpoint to handle sending emails
router.post('/make-announcement', async (req, res) => {

  try {

    // Configure Nodemailer with Gmail credentials
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: req.body.from,
        pass: req.body.secretKey, // Initially empty, will be updated later
      },
    });

    // Enable Nodemailer logging
    transporter.on('log', (data) => {
      console.log(data);
    });

    // Assuming req.body.students is an array of student email addresses
    const students = req.body.students;
    const bcc = req.body.bcc;
    // const secretKey = req.body.secretKey; // Get the secretKey from req.body
    // console.log(secretKey);
    // transporter.options.auth.pass = secretKey;
    console.log(transporter.options.auth);

    // Check if 'students' and 'bcc' are arrays
    if (!Array.isArray(students) || !Array.isArray(bcc)) {
      return res.status(400).json({ error: 'Invalid input: students and bcc should be arrays' });
    }

    const subject = req.body.subject;
    const text = req.body.text;

    // Check if required fields are provided
    if (!subject || !text) {
      return res.status(400).json({ error: 'Missing required fields: subject, text, or secretKey' });
    }

    // Update the transporter's pass with the secretKey from req.body
    

    // Create the email content
    const mailOptions = {
      from: "dduums123@gmail.com",
      to: students.join(', '),
      bcc: bcc.join(', '),
      subject: subject,
      text: text,
    };

    // Use async/await to handle sending email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    if (error.code === 'EAUTH') {
      return res.status(401).json({ error: 'Authentication failed. Invalid secretKey.' });
    } else {
      return res.status(500).json({ error: 'Error sending email' });
    }
  }
});

module.exports = router;
