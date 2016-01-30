'use strict';

// https://tools.ietf.org/html/rfc7519#section-4.1.7

const assert = require('assert');
const fs = require('fs');
// ~/.ssh $ ssh-keygen -t rsa -b 4096 -C "junk@id.rsa"
//
// This second bit is the KEY!!! You MUST turn your .pub file into a .pem
// or jsonwebtoken no like it! You will get nasty errors like:
// JsonWebTokenError: invalid algorithm
//
// ~/.ssh $ ssh-keygen -f junk_id_rsa.pub -e -m pem > junk_id_rsa.pem
// const priv = fs.readFileSync('/Users/jstein/.ssh/junk_id_rsa');
// const pub = fs.readFileSync('/Users/jstein/.ssh/junk_id_rsa.pem');

// const user = {
//   name: 'frank',
//   email: 'frank@stein.com',
//   roles: ['SALES', 'DEVOPS', 'ROOT']
// };

// const secret =
//   '@$%QASDFTRHR^&*TFHNHRO&*^))__KMNDSFGEW^$kdieksiekfjisolsie223439k39';

// describe('JSON Web Tokens', function() {

//   this.timeout(3000);

//   describe('sign and verify', () => {

//     let token = jwt.sign(user, secret, {
//       notBefore: 1,
//       expiresIn: 2
//     });

//     let atoken = jwt.sign(user, priv, {
//       algorithm: 'RS256'
//     });

//     it('should verify with public key when signed with private key', (done) => {
//       jwt.verify(atoken, pub, {
//         algorithm: 'RS256'
//       }, (err, ua) => {
//         if (err) {
//           done(err);
//         } else {
//           assert.equal(ua.name, user.name);
//           assert.equal(ua.email, user.email);
//           assert.equal(ua.roles[0], user.roles[0]);
//           assert.equal(ua.roles[1], user.roles[1]);
//           assert.equal(ua.roles[2], user.roles[2]);
//           done();
//         }
//       });
//     });

//     it('verify should error "not active" before 1 second', () => {
//       try {
//         jwt.verify(token, secret);
//       } catch (e) {
//         assert.equal('NotBeforeError: jwt not active', e + '');
//       }
//     });

//     it('verify should succeed after 1 second', (next) => {
//       setTimeout(() => {
//         let u2 = jwt.verify(token, secret);
//         assert.equal(u2.name, user.name);
//         assert.equal(u2.email, user.email);
//         assert.equal(u2.roles[0], user.roles[0]);
//         assert.equal(u2.roles[1], user.roles[1]);
//         assert.equal(u2.roles[2], user.roles[2]);
//         next();
//       }, 1010);
//     });

//     it('verify should error "jwt expired" after 2 seconds', (next) => {
//       setTimeout(() => {
//         try {
//           jwt.verify(token, secret);
//         } catch (e) {
//           assert.equal('TokenExpiredError: jwt expired', e + '');
//         }
//         next();
//       }, 1010);
//     });

//   });
// });