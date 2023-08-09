const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const url = "mongodb+srv://Ashish:6tmC5FNA8T5IcDiJ@dms.donboph.mongodb.net/DMS";

mongoose.connect(url, { useNewUrlParser: true });

app.use(express.json());

const middleware = (req, res, next) => {
    console.log("Middleware is working");
    next();
};
const authUser = (role) => {
    return(req, res, next) => {
        if (req.body.role !== role) {
            res.status(401);
            return res.send("Not allowed");
        }
        next();
    };
};

app.use("/student", authUser("student") ,  require("./Routers/StudentRouter"));
app.use("/faculty", authUser("faculty") , require("./Routers/facultyRouter"));
app.use("/tpo", authUser("tpo") , require("./Routers/tpoRouter"));
app.use("/tto", authUser("tto") , require("./Routers/ttoRouter"));
app.use("/admin", authUser("admin") , require("./Routers/adminRouter"));
app.use("/hod", authUser("hod") , require("./Routers/hodRouter"));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});