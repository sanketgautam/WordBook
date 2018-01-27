import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Response from '../helpers/Response';
import config from '../../config/config';
import mongoose from 'mongoose';
import User from '../models/user.model';

exports.userAuthenticatator = function(req, res, next) {

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    const err = new APIError(httpStatus.UNAUTHORIZED, 'Invalid user', null, null);
    next(err);
  }

  if (!req.user._id) {
    const err = new APIError(httpStatus.UNAUTHORIZED, 'Invalid user', null, null);
    next(err);
  }


  User.findOne({
    _id: req.user._id,
    email: req.user.email,
  }).exec(function(err, user) {
    if (err || !user) {
      return next(new APIError(httpStatus.UNAUTHORIZED, 'Invalid user', null, null));
    }
  });
  next();
}
