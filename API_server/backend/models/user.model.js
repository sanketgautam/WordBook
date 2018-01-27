import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import crypto from 'crypto';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
  },
  password: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userDict: [{
    word: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dictionary',
    },
    lang: String,
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // 1easy, 2medium, 3difficult
    },
  }],
  salt: {
    type: String
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});


/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};
//
// UserSchema.virtual('relation', {
//   ref: 'Dictionary', // The model to use
//   localField: 'word', // Find people where `localField`
//   foreignField: 'word', // is equal to `foreignField`
//   // If `justOne` is true, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: false
// });
//

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
