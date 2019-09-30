import Joi from 'joi';

export default class Job {
  static get jobSchema() {
    return Joi.object({
      email: Joi.string().email(),
      location: Joi.string().max(100),
      jobType: Joi.equal(['whiteCollar', 'blueCollar']).required(),
      description: Joi.string()
        .required()
        .max(255),
      address: Joi.string()
        .required()
        .max(255),
      category: Joi.string().max(100),
      title: Joi.string()
        .min(5)
        .required(),
      longitude: Joi.number()
        .greater(-90)
        .less(90)
        .precision(6),
      latitude: Joi.number()
        .greater(-90)
        .less(90)
        .precision(6),
    });
  }
}
