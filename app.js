const express = require('express');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
// set view engine ejs
app.set('view engine', 'ejs');

// session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// passport initialize
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log('database connected');
})


// set routes
app.use('/auth', require('./routes/auth-routes'))
app.use('/profile', require('./routes/profile-routes'))

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})


app.listen(3000, () => {
    console.log(`server running on port...`);
})