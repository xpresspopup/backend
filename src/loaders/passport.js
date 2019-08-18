import JwtStrategy from 'passport-jwt';
import config from '../config/index';
import User from '../models/User';
const { Strategy, ExtractJwt } = JwtStrategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;
const passportFunction = (passport) => {
  passport.use(
    new Strategy(opts, async ({ email }, next) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
};
export default passportFunction;
