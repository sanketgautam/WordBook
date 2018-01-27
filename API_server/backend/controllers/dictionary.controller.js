import jwt from 'jsonwebtoken';
import http from 'http';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Response from '../helpers/Response';
import config from '../../config/config';
import mongoose from 'mongoose';
import Dictionary from '../models/dictionary.model';
import request from 'request';

exports.findWord = function(req, res, next) {

  const api_path = "v4/word.json/" + req.params.word + "/definitions?limit=8&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
  const url = "http://api.wordnik.com:80/" + api_path;

  let param_ = {
    word: req.params.word
  };
  Dictionary.findOne(param_, function(err, word) {
    if (err) {
      const err = new APIError(httpStatus.BAD_REQUEST, 'Unable to process your request', null, null);
      return next(err);
    } else if (!word) {

      request(url, {
        json: true
      }, (err, ress, body) => {
        if (err) {
          return next(new APIError(httpStatus.BAD_REQUEST, 'Unable to process your request', null, null));
        }

        let word_def = [];

        for (var i = 0; i < body.length; i++) {
          let pp = {
            partOfSpeech: body[i].partOfSpeech,
            text: body[i].text,
          };
          word_def.push(pp);
        }
        if(body.length <= 0){
          let meaning  = {
            word : req.params.word,
            meanings : [],
          };
          return res.json(new Response(httpStatus.OK, 'word def', meaning, null));
        }


        let dictionary = new Dictionary({
          word: req.params.word,
          definition: {
            ahdLegacy: word_def,
          },
        });

        let meaning  = {
          word : req.params.word,
          meanings : word_def,
        };


        dictionary.save(function(err) {
          if (err) {
            return next(new APIError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error, Please try again', null, null));
          } else {
            return res.json(new Response(httpStatus.OK, 'word def', meaning, null));
          }
        });

      });
    } else {
      let meaning  = {
        word : word.word,
        meanings : word.definition.ahdLegacy,
      };
      return res.json(new Response(httpStatus.OK, 'word def', meaning, null));
    }
  });

}
