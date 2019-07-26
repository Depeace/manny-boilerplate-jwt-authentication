const User = require("./../models/User");
const jwt = require('jwt-simple');
const config = require('./../config');

const tokenForUSer = function (user) {
    const timestamp = new Date().getTime();
    // Sub === subject
    // iat === issued at time

    // Its going to encode the whole !st object and add our secret to it
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};


module.exports = {
    signUp: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'You must provide an email and password' });
        }
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(422).json({ error: 'email is in use' });
            }

            const user = new User({ email, password });
            await user.save();
            res.json({ token: tokenForUSer(user) });
        } catch (e) {
            console.log(e)
            res.status(404).json({ e });
        }
    },
    signIn: (req, res) => {
        res.send("i'm hit");
    }
}

