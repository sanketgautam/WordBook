import express from 'express';
import userRoute from './user.route';
import dictionaryRoute from './dictionary.route';

const router = express.Router();
router.use('/dictionary', dictionaryRoute);
router.use('/user', userRoute);


export default router;
