const express = require('express');
const passport = require('passport');
const router = express.Router();

// auth login
router.get('/login', (req, res) => {
    res.render('login')
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with google
    res.send('logout')

})

// auth google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))


// red
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('this URI reached')
})

module.exports = router;