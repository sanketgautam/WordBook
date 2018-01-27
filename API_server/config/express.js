import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import winstonInstance from './winston';
import expressValidator from 'express-validator';

//confin and response providers
import config from './config';
import APIError from '../backend/helpers/APIError';
import Response from '../backend/helpers/Response';

//routes
import routes from '../backend/routes/index.route';

/* ---------------- END IMPORTS -------------- */

const app = express();
const router = express.Router();
if (config.ENV === 'development') {
  app.use(logger('dev'));
}

//parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(expressValidator());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
}

app.use((err, req, res, next) => {
  return next(err);
});

app.use('/api', routes);



// serve client side code
app.use('/', express.static('frontend'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError(httpStatus.NOT_FOUND, 'API not found', null, null);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.ENV !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    status: err.status,
    message: err.isPublic ? err.message : httpStatus[err.status],
    data: err.data,
    error: err.errors,
    stack: config.ENV === 'development' ? err.stack : {}
  })
);

export default app;
