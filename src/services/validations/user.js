import Joi from 'joi';

export default class User {
  static get userSchema() {
    return Joi.object({
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
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
      phoneNumber: Joi.string()
        .min(11)
        .max(14),
      address: Joi.string().max(255),
      ipAddress: Joi.string(),
      title: Joi.string().min(5),
      isAdmin: Joi.equal([true, false]),
      accountConfirm: Joi.equal([true, false]),
      isActive: Joi.equal([true, false]),
      isVerified: Joi.equal([true, false]),
    });
  }

  static get userUpdateSchema() {
    return Joi.object({
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
      phoneNumber: Joi.string()
        .min(11)
        .max(14),
      address: Joi.string().max(255),
      latitude: Joi.number(),
      longtude: Joi.string(),
      ipAddress: Joi.string(),
      userType: Joi.string().equal([
        'admin',
        'blueCollar',
        'whiteCollar',
        'employer',
        'client',
        'vendor',
      ]),
      title: Joi.string().min(5),
      profilePic: Joi.string(),
      // blueCollar update
      gender: Joi.string().equal(['male', 'female', 'prefer not to say']),
      stateOfOrigin: Joi.string()
        .lowercase()
        .max(50),
      local_govt_area: Joi.string()
        .lowercase()
        .max(100),
      ageRange: Joi.string(),
      // company validation
      subcriptionType: Joi.string().equal(['free', 'premium']),
      rcNumber: Joi.string().max(100),
      location: Joi.string()
        .max(100)
        .lowercase(),
      category: Joi.string(),
      // whiteCollar validation
      cvUrl: Joi.string(),
      bio: Joi.string().max(500),
      dateOfBirth: Joi.string(),
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

  static get validateUserType() {
    return Joi.object({
      userType: Joi.string()
        .required()
        .equal([
          'admin',
          'blueCollar',
          'whiteCollar',
          'employer',
          'businessOwner',
          'vendor',
        ]),
    });
  }
}
