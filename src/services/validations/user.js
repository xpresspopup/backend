import Joi from 'joi';

export default class User {
  static get userSchema() {
    return Joi.object({
      firstname: Joi.string()
        .max(100)
        .required(),
      lastname: Joi.string()
        .max(100)
        .required(),
      email: Joi.string()
        .email()
        .min(3)
        .max(150)
        .trim()
        .required(),
      password: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
      isAdmin: Joi.string(),
    });
  }

  static get signInUser() {
    return Joi.object({
      email: Joi.string()
        .email()
        .trim()
        .min(5)
        .max(150)
        .required(),
      password: Joi.string()
        .min(2)
        .max(30)
        .required(),
    });
  }
}
