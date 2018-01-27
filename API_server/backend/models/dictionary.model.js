import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import crypto from 'crypto';
/**
 * dictionary Schema
 */
const DictionarySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
  },
  definition: {
    ahdLegacy: [{
      partOfSpeech: String,
      text: String,
    }],
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


export default mongoose.model('Dictionary', DictionarySchema);
