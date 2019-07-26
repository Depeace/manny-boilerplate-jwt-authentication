const passport = require('passport');
const User = require('./../models/User');
const config =  require('./../config');
const JwtStrategy = ('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy



// bydefault LocalStrategy it is expecting a username  and a passport
const localOption = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOption, async (email, password, done) => {
    try{
        const user = await User.findOne({ email })
        if(!user) {
            return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) => {
            if(err) return done(err)
            if(!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    }catch(e){
        done(e, false);
    }
});