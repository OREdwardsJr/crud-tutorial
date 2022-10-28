const express = require("express");
const router = express.Router();
const { loadRegistration, logoutUser, getUsers, registerUser, getProfile } = require("./../controllers/auth-cntrl");
const connectEnsureLogin = require('connect-ensure-login'); //authorization

// login
//router.post('/login', attemptLogin);

// go to register page
router.get('/register', loadRegistration)

// submit registration
router.post('/register/attempt', registerUser)

// logout
router.get('/logout', logoutUser)

// get user profile
router.get('/profile', connectEnsureLogin.ensureLoggedIn(), getProfile)

// get all users
router.get('/users', getUsers)

// practice
router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/public/secret.html')
})

module.exports = router;