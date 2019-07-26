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

// setup options for Jwt strategy
// we need to tell our strategy where to look for the token

const jwtOptions = {
    // tells JWt strategy that whenever arequest comes in
    // and we want passport to handle it
    // It needs to look in the header, for the property called "authorization"
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),

    // tells jwt strategy waht secret w used to encode the token
    // so that it can decode it

}

passport.use(localLogin);