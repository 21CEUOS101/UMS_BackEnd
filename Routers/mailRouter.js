// Routers/mailRouter.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const session = require('express-session');

// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "dduums123@gmail.com",
    pass: "cgjljvxrqiiwyztg", // Use the App Password generated for your Gmail account
  },
});

// Enable Nodemailer logging
transporter.on("log", (data) => {
  console.log(data);
});

// API endpoint to handle sending emails
router.post("/makeannouncement", (req, res) => {
  // Assuming req.body.students is an array of student email addresses
  const students = req.body.students;
  const bcc = req.body.bcc;

  // Make sure 'students' is an array before calling 'join'
  if (Array.isArray(students) && Array.isArray(bcc)) {
    const subject = req.body.subject;
    const text = req.body.text;

    // Create the email content
    const mailOptions = {
      from: "dduums123@gmail.com",
      to: students.join(", "),
      bcc: bcc.join(", "),
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    res
      .status(400)
      .json({ error: "Invalid input: students should be an array" });
  }
});

module.exports = router;
