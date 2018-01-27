import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
      .allow(['development', 'production', 'test'])
      .default('development'),
    PORT: Joi.number()
      .default(4040),
     MONGOOSE_DEBUG: Joi.boolean()
      .when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
      }),
    JWT_SECRET: Joi.string().required()
      .description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string().required()
      .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
      .default(27017)
  }).unknown()
  .required();

const {
  error,
  value: envVars
} = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGOOSE_DEBUG: envVars.MONGOOSE_DEBUG,
  JWT_SECRET: envVars.JWT_SECRET,
  MONGO_HOST: envVars.MONGO_HOST,
  MONGO_PORT: envVars.MONGO_PORT
};

export default config;
