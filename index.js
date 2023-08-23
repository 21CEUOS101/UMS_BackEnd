const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/UMS";

mongoose.connect(url, { useNewUrlParser: true });

app.use(express.json());

const authUser = (role) => {
    return function (req, res, next){
        if (req.session.role !== role) {
            res.status(401);
            res.send("Not allowed");
        }
        next();
    };
};

// Set up other routes based on user roles (similar to your code)
app.use("/student", authUser("student"), require("./Routers/studentRouter"));
app.use("/faculty", authUser("faculty"), require("./Routers/facultyRouter"));
app.use("/tpo", authUser("tpo"), require("./Routers/tpoRouter"));
app.use("/tto", authUser("tto"), require("./Routers/ttoRouter"));
app.use("/admin", authUser("admin"), require("./Routers/adminRouter"));
app.use("/hod", authUser("hod"), require("./Routers/hodRouter"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
