import express from 'express';
import expressJwt from 'express-jwt';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';
import authenticator from '../middlewares/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  .post(userCtrl.login);

router.route('/signup')
  .post(userCtrl.signup);

router.route('/me')
  .get(expressJwt({
    secret: config.JWT_SECRET
  }), userCtrl.getProfile);


router.route('/saveWord')
    .post(expressJwt({ secret: config.JWT_SECRET }),authenticator.userAuthenticatator,userCtrl.saveUserWord);

router.route('/words')
    .get(expressJwt({ secret: config.JWT_SECRET }),authenticator.userAuthenticatator,userCtrl.getAllWords);

router.route('/recent')
    .get(expressJwt({ secret: config.JWT_SECRET }),authenticator.userAuthenticatator,userCtrl.getRecent);


export default router;
