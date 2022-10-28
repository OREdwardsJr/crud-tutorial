const express = require("express");
const router = express.Router();
const { registerUser, logoutUser, getUsers } = require("./../controllers/auth-cntrl");
const connectEnsureLogin = require('connect-ensure-login'); //authorization

// login
//router.post('/login', attemptLogin);

// signup
router.post('/register', registerUser)

// logout
router.get('/logout', logoutUser)

// get all users
router.get('/users', getUsers)

// practice
router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/public/secret.html')
})

module.exports = router;