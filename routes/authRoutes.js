const passport = require('passport');

module.exports = app => {
  // Below code uses GoogleStrategy by using clientSecret and clientID and once the user grants permission to use his account,
  // it redirects to the callbackURL with an auth id /auth/google/callback?id=3324834
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Below code handles the callbackURL with an auth id and passes it on to passport to receieve the accessToken and refreshToken
  // here passport.authenticate function automatically detects the auth id in the callbackURL and behaves differently from first call
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
