import Joi from 'joi';

export default class Job {
  static get listSchema() {
    return Joi.object({
      description: Joi.string()
        .required()
        .max(255),
      address: Joi.string()
        .required()
        .max(255),
      category: Joi.string()
        .max(100)
        .required(),
      title: Joi.string().required(),
      longitude: Joi.number()
        .greater(-90)
        .less(90)
        .precision(6)
        .required(),
      latitude: Joi.number()
        .greater(-90)
        .less(90)
        .precision(6)
        .required(),
    });
  }
}
