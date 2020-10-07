const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');


passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)))


passport.use(new GoogleStrategy({
    // google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({
        googleId: profile.id
    }).then(user => {
        if (user) {
            done(null, user)
        } else {
            new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile.photos[0].value
                }).save()
                .then(newUser => {

                    done(null, newUser)

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }).catch(err => {
        console.log(err);
    })

}))