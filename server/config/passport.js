const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = '../models/user';

const opts = {};

opts.secretOrKey = process.env.jwt_key;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport =>
	passport.use(
		new JwtStrategy(opts, (jwt, done) => {
			User.findOne({ email: jwt.email })
				.then(user => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch(err => done(err, false));
		})
	);
