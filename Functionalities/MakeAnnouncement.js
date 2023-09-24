const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: localStorage.getItem('email'),
    pass: '', // Initially empty, will be updated later
  },
});

router.use(express.json());

// Enable Nodemailer logging
transporter.on('log', (data) => {
  console.log(data);
});

// API endpoint to handle sending emails
router.post('/make-announcement', (req, res) => {
  // Assuming req.body.students is an array of student email addresses
  const students = req.body.students;
  const bcc = req.body.bcc;
  const secretKey = req.body.secretKey; // Get the secretKey from req.body

  // Update the transporter's pass with the secretKey from req.body
  transporter.options.auth.pass = secretKey;

  // Make sure 'students' is an array before calling 'join'
  if (Array.isArray(students) && Array.isArray(bcc)) {
    const subject = req.body.subject;
    const text = req.body.text;

    // Create the email content
    const mailOptions = {
      from: localStorage.getItem('email'), // Use the email from localStorage
      to: students.join(', '),
      bcc: bcc.join(', '),
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid input: students should be an array' });
  }
});

module.exports = router;
