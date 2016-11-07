'use strict';

// https://tools.ietf.org/html/rfc7519
// https://github.com/brianloveswords/node-jws
//
// Login authenticates a user and returns a JSON web token (JWT) on success.
// Returns 401 if authentication is unsuccessful.

const jws = require('jws');
const day = 60 * 60 * 24;
const alg = 'HS512';
const encoding = 'utf8';

// { host: 'localhost:3377',
//   connection: 'keep-alive',
//   authorization: 'Bearer asdfasdfasfkkkk',
//   'cache-control': 'no-cache',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36',
//   'postman-token': '1015d9ca-986f-2ccf-2a78-87e80496103c',
//   accept: '*/*',
//   'accept-encoding': 'gzip, deflate, sdch',
//   'accept-language': 'en-US,en;q=0.8' }
function guard(secret) {
  return function(req, res, next) {
    try {
      let jwt = req.headers.authorization.split(' ')[1];
      req.user = JSON.parse(jws.decode(jwt).payload);
    } catch (err) {}
    let now = Math.floor(Date.now() / 1000);
    console.log(req.user);
    if (!!req.user && now < req.user.exp) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
}

// secret       Your top secret secret.
// getuserfn    getuserfn(req.body, cb) must return the user information you want
//              to sent to the client. should contain only public info you
//              want sent to the browser.
function login(secret, getuserfn) {
  return function(req, res, next) {
    let iat = Math.floor(Date.now() / 1000);
    let exp = iat + day;
    getuserfn(req.body, (err, user) => {
      if (err) {
        next(err);
      } else {
        if (user === null) {
          res.sendStatus(401);
        } else {
          user.iat = iat;
          user.exp = exp;
          let tosign = {
            header: {
              alg: alg
            },
            payload: user,
            secret: secret,
            encoding: encoding
          };
          try {
            let jwt = jws.sign(tosign);
            res.json({
              user: user,
              jwt: jwt
            });
          } catch (err) {
            next(err);
          }
        }
      }
    });
  };
}

exports = module.exports = {
  login,
  guard
};