import express from 'express';
import expressJwt from 'express-jwt';
import dictionaryCtrl from '../controllers/dictionary.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/word/:word')
  .get(dictionaryCtrl.findWord);

export default router;
