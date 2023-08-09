const express = require('express');

const LoginRouter = express.Router();

const LoginModel = require('../Models/Login_Auth/LoginModel');

LoginRouter.post('/', async (req, res) => {

    const { user_id, role, password } = req.body;

    try {
        const login = LoginModel.find({ user_id: user_id });
        if (login) {
            const isMatch = await bcrypt.compare(password, login.password);
            if (isMatch) {
                res.json({ msg: 'Login Successful' , isLoggedIn : true , role : role});
            } else {
                res.json({ msg: 'Invalid Credentials' , isLoggedIn : false });
            }
        } else {
            res.json({ msg: 'Invalid Credentials' , isLoggedIn : false });
        }
    } catch (error) {
        res.json({ msg: 'Server Error' , isLoggedIn : false });
    }
}
);