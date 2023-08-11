const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/UMS";
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

mongoose.connect(url, { useNewUrlParser: true });

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: 'your-secret-key', // Use a secret key for session management (this should be a strong secret)
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set secure to true if using HTTPS
    })
);

const authUser = (role) => {
    return (req, res, next) => {
        if (req.session.role !== role) {
            res.status(401);
            return res.send("Not allowed");
        }
        next();
    };
};

app.post('/login', async (req, res) => {
    const { user_id, role, password } = req.body;

    try {
        // In a real scenario, you should replace this with proper user authentication logic
        // Here, I'll assume you have a UserModel with a hashed password field
        const user = await UserModel.findOne({ user_id });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Store user role in the session
            req.session.role = role;
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/protected', authUser('admin'), (req, res) => {
    res.json({ message: 'You have access to the protected route' });
});

// Set up other routes based on user roles (similar to your code)
app.use("/student", authUser("student"), require("./Routers/StudentRouter"));
app.use("/faculty", authUser("faculty"), require("./Routers/facultyRouter"));
app.use("/tpo", authUser("tpo"), require("./Routers/tpoRouter"));
app.use("/tto", authUser("tto"), require("./Routers/ttoRouter"));
app.use("/admin", authUser("admin"), require("./Routers/adminRouter"));
app.use("/hod", authUser("hod"), require("./Routers/hodRouter"));
app.use('/email', require('./Routers/mailRouter')); // Add this line for email router

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
