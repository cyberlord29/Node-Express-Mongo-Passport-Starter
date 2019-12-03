import models from './models';
import expressJwt from 'express-jwt'

function jwt() {
    const secret = process.env.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/users/authenticate',
        ]
    });
  }
  
async function isRevoked(req, payload, done) {
    console.log(payload)
    const user = await models.User.getById(payload.sub);
  
    if (!user) {
        return done(null, true);
    }
  
    done();
  };

export default jwt