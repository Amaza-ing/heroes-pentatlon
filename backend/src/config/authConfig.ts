const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  algorithms: ["HS512"],
};

const strategy = new JwtStrategy(options, async (payload: any, done: any) => {
  if (payload.token != process.env.TOKEN)
    return done(null, false, { message: "Something goes wrong!!" });
  return done(null, payload.token);
});

module.exports = (passport: any) => {
  passport.use(strategy);
};
