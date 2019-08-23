import Joi from '@hapi/joi';

export const genericValidator = (req, res, schema, next) => {
  const { error } = Joi.validate(req.body, schema, {
    abortEarly: false,
    convert: true,
  });
  if (error) {
    const errors = [];
    const { details: errArr = [] } = error || {};
    errArr.forEach((err) => {
      errors.push(err.message.split('"').join(''));
    });
    return res.status(400).json({
      status: res.statusCode,
      errors,
    });
  }
  return next();
};

export default class Validation {
  static userValidator(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      first_name: Joi.string()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required(),
      last_name: Joi.string()
        .alphanum()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required(),
      phone_number: Joi.string()
        .strict()
        .trim()
        .regex(/^[0-9]{7,10}$/)
        .required(),
      address: Joi.string()
        .strict()
        .trim()
        .min(2)
        .max(50)
        .required(),
      password: Joi.string()
        .min(6)
        .max(50)
        .required(),
      confirm_password: Joi.string()
        .min(6)
        .max(50)
        .required(),
      is_admin: Joi.boolean(),
    });
    genericValidator(req, res, schema, next);
  }

  static petitionValidator(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string()
        .min(10),
    });
    genericValidator(req, res, schema, next);
  }

  static signInValidator(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(6)
        .max(50)
        .required(),
    });
    genericValidator(req, res, schema, next);
  }

  static voteValidator(req, res, next) {
    const schema = Joi.object().keys({
      vote: Joi.boolean().required(),
    });
    genericValidator(req, res, schema, next);
  }
}
