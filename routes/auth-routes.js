const express = require('express');
const passport = require('passport');
const router = express.Router();

// auth login
router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    })
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with google
    req.logOut();
    res.redirect('/')

})

// auth google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))


// red
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
})

module.exports = router;