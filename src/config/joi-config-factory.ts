import * as Joi from 'joi';

import { AppEnvironment } from 'src/models';

export const joiConfigFactory = () => ({
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid(AppEnvironment.Development, AppEnvironment.Production, AppEnvironment.Test).required(),
    PORT: Joi.number().required(),
    DB_PORT: Joi.number().required(),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_AUTH_SOURCE: Joi.string().required(),
    DB_FILES_COLLECTION_PREFIX: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
});
