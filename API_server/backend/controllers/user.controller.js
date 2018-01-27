import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Response from '../helpers/Response';
import config from '../../config/config';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Dictionary from '../models/dictionary.model';
const ObjectId = mongoose.Types.ObjectId;


/**
 * Returns jwt token if valid username and password is provided
 */
exports.login = function login(req, res, next) {

  let loginData = {
    email: req.body.email.toLowerCase()
  };
  User.findOne(loginData, function(err, user) {
    if (err || !user) {
      err = new APIError(httpStatus.UNAUTHORIZED, 'Credentials not valid', null, null);
      return next(err);
    }

    if (user.authenticate(req.body.password)) {
      var payload = {
        email: user.email,
        _id: user._id,
      }
      const token = jwt.sign(payload, config.JWT_SECRET);

      var data = {
        token,
        email: user.email,
      };
      return res.json(new Response(httpStatus.OK, 'Logged in successfully.', data));

    } else {
      const err = new APIError(httpStatus.UNAUTHORIZED, 'Credentials not valid.', null, null);
      return next(err);
    }

  });
}

exports.getProfile = function(req, res, next) {
  // req.user is assigned by jwt middleware if valid token is provided
  User.findOne({
    _id: req.user._id,
  }, '-salt -password').exec(function(err, user) {

    if (err || !user) {
      const err = new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized request.', null, null);
      return next(err);
    } else {
      return res.json(new Response(httpStatus.OK, 'User Profile', user));
    }
  });
}


/**
 * Signup
 */
exports.signup = function(req, res, next) {

  //check for existing mail
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      return next(new APIError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error, Please try again', null, null));
    } else {
      if (!user) {

        // Init user and add missing fields
        let newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });


        // Then save the data to the db
        newUser.save(function(err) {
          if (err) {
            return next(new APIError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error, Please try again', null, null));
          } else {
            var payload = {
              email: newUser.email,
              _id: newUser._id,
            }

            const token = jwt.sign(payload, config.JWT_SECRET);

            var data = {
              token,
              email: newUser.email,
            };
            return res.json(new Response(httpStatus.OK, 'Account created successfully !!', data, null));
          }
        });
      } else {
        return next(new APIError(httpStatus.BAD_REQUEST, 'Email already registered', null, null));
      }
    }
  });
};

exports.saveUserWord = function(req, res, next) {

  let diff = req.body.difficulty;
  let a = ["easy", "medium", "difficult"];

  if (diff == "easy" || diff == "medium" || diff == "difficult") {

    Dictionary.findOne({
      word: req.body.word,
    }, '-definition').exec(function(err, dword) {

      if (err || !dword) {
        const err = new APIError(httpStatus.BAD_REQUEST, 'Invalid request', null, null);
        return next(err);
      } else {

        let wordid = new ObjectId(dword._id);

        User.findOneAndUpdate({
            _id: req.user._id,
            'userDict.word': wordid
          }, {
            $set: {
              'userDict.$.difficulty': diff
            }
          })
          .exec(function(err, word) {
            if (err) {
              const err = new APIError(httpStatus.BAD_REQUEST, 'Unable to save word', null, null);
              return next(err);
            } else if (!word) {
              User.findOneAndUpdate({
                _id: req.user._id
              }).exec(function(err, user) {
                if (err || !user) {
                  const err = new APIError(httpStatus.BAD_REQUEST, 'Unable to save word', null, null);
                  return next(err);
                }
                let wwoo = {
                  word: wordid,
                  difficulty: diff,
                };

                user.userDict.push(wwoo);
                user.save();
                wwoo.saved = true;
                return res.json(new Response(httpStatus.OK, 'Word saved successfully', wwoo, null));

              });

            } else {

              let wwoo = {
                word: req.body.word,
                difficulty: word.difficulty,
              };

              return res.json(new Response(httpStatus.OK, 'Word saved successfully', wwoo, null));
            }
          });


      }
    });
  } else {
    const err = new APIError(httpStatus.BAD_REQUEST, 'Invalid difficulty option :(', null, null);
    return next(err);
  };

};

exports.getAllWords = function(req, res, next) {
  User.findOne({
      _id: req.user._id,
    }, 'userDict')
    .populate('userDict.word')
    .exec(function(err, dict) {
      if (err || !dict) {
        return next(new APIError(httpStatus.BAD_REQUEST, 'Record does not exists', null, null));
      } else {

        let pp = dict.userDict.map(function(val){
          let nword = {
            word : val.word.word,
            meaning: val.word.definition.ahdLegacy[0],
            difficulty: val.difficulty
          }
          return nword;
        });


        return res.json(new Response(httpStatus.OK, 'User words', pp));
      }
    });

};
exports.getRecent = function(req, res, next) {
  User.findOne({
      _id: req.user._id,
    }, {'userDict' : {$slice : 10}})
    .populate('userDict.word')
    .exec(function(err, dict) {
      if (err || !dict) {
        return next(new APIError(httpStatus.BAD_REQUEST, 'Record does not exists', null, null));
      } else {

        let pp = dict.userDict.map(function(val){
          let nword = {
            word : val.word.word,
            meaning: val.word.definition.ahdLegacy[0],
            difficulty: val.difficulty
          }
          return nword;
        });


        return res.json(new Response(httpStatus.OK, 'User words', pp));
      }
    });

};
