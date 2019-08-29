import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import routes from './routes';
import models from './models';

dotenv.config();

const app = express();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/fb/callback',
  profileFields: ['id', 'emails', 'name'],
},
(async (accessToken, refreshToken, profile, cb) => {
  const { dataValues: mUser } = await models.users
    .findOne({ where: { email: profile.emails[0].value } });
    // strip out password
  const {
    password,
    // eslint-disable-next-line camelcase
    phone_number,
    address,
    // eslint-disable-next-line camelcase
    is_admin,
    createdAt,
    updatedAt,
    ...user
  } = mUser;
  // eslint-disable-next-line no-console
  return cb(null, user);
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

const PORT = process.env.PORT || 3000;

app.use('/api/v1/', routes);
app.use('*', (req, res) => {
  res.status(404).send({ error: 'route not found' });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));

export default app;
