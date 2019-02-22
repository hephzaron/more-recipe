import dotEnv from 'dotenv';

dotEnv.config();

const {
  AUTH_FACEBOOK_CLIENT_ID,
  AUTH_FACEBOOK_CLIENT_SECRET,
  AUTH_FACEBOOK_CALLBACK,
  AUTH_GOOGLE_CLIENT_ID,
  AUTH_GOOGLE_CLIENT_SECRET,
  AUTH_GOOGLE_CALLBACK
} = process.env;

export default {
  facebook: {
    clientID: AUTH_FACEBOOK_CLIENT_ID,
    clientSecret: AUTH_FACEBOOK_CLIENT_SECRET,
    callbackURL: AUTH_FACEBOOK_CALLBACK
  },
  google: {
    clientID: AUTH_GOOGLE_CLIENT_ID,
    clientSecret: AUTH_GOOGLE_CLIENT_SECRET,
    callbackURL: AUTH_GOOGLE_CALLBACK
  }
};