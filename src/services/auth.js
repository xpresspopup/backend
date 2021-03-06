import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/user';
import errorHandler from '../helpers/errorHandler';
import User from '../models/User';
import WhiteCollar from '../models/WhiteCollarUser';
import ListingUser from '../models/ListingUser';
import BlueCollar from '../models/BlueCollarUser';
import Employer from '../models/Employer';
import userRepository from '../repository/auth';
import employerRepository from '../repository/employer';
import whiteCollarRepository from '../repository/whiteCollar';
import blueCollarRepository from '../repository/blueCollar';
import emailService from './emailService2';
import emailTemplate from '../helpers/emailTemplates';
import functions from '../helpers/functions';
import cloud from './cloudinary';
export default class AuthService {
  //   constructor ({userRepository, logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addUser(userInput, res) {
    try {
      const result = Joi.validate(userInput, validation.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const { email } = userInput;
        const existUser = await userRepository.getUserByEmail(email);
        if (existUser) {
          errorHandler.serverResponse(res, 'User already exist', 400);
        }
        const userObject = { ...userInput };
        const confirmCode = functions.generateConfirmCode();
        userObject.confirmationCode = confirmCode;
        const user = new User(userObject);
        await user.save();
        await emailService.sendText(
          email,
          'Confirm your account',
          emailTemplate.confirmEmail(confirmCode),
        );
        return user;
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async selectUserType({ id, userType }, res) {
    try {
      const result = Joi.validate({ userType }, validation.validateUserType, {
        convert: false,
      });
      if (result.error === null) {
        const userId = id;
        await userRepository.updateUser({ _id: id }, { userType });
        const whiteCollar = new WhiteCollar({ userId });
        const blueCollar = new BlueCollar({ userId });
        const employer = new Employer({ userId });
        const listingUser = new ListingUser({ userId });
        switch (userType) {
          case 'whiteCollar':
            await whiteCollar.save();
            break;
          case 'blueCollar':
            await blueCollar.save();
            break;
          case 'employer':
            await employer.save();
            break;
          case 'businessOwner':
            await listingUser.save();
            break;
          case 'vendor':
            console.log('jude is an vendor');
            break;
          case 'admin':
            console.log('jude is an admin');
            break;

          default:
            break;
        }
        return true;
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async verifyRegUser(confirmCode, email, res) {
    try {
      const doc = await userRepository.getUserByEmail(email);
      if (doc) {
        const confirmationCode =					!Number.isNaN(confirmCode) && String(confirmCode).trim().length === 6
					  ? parseInt(confirmCode, 10)
					  : 'Invalid activation code';
        if (doc.confirmationCode !== confirmationCode) {
          return errorHandler.serverResponse(
            res,
            'Invalid confirmation code',
            400,
          );
        }
        const rslt = await userRepository.updateUser(
          { email, accountConfirm: false },
          { accountConfirm: true, isActive: true },
        );
        if (rslt) {
          await emailService.sendText(
            email,
            'Welcome to Pop Express',
            emailTemplate.registrationEmail(),
          );
        }
        return true;
      }
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async verifyUserSignIn(userInput, res) {
    try {
      const { email, password } = userInput;
      const result = Joi.validate(userInput, validation.signInUser, {
        convert: false,
      });
      if (result.error === null) {
        const user = await userRepository.getUserByEmail(email);
        if (user) {
          if (user.isActive && user.accountConfirm) {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
              const { token, firstname, lastname } = await user.generateToken();
              return { firstname, lastname, token };
            }
            return errorHandler.serverResponse(
              res,
              'Password does not match',
              400,
            );
          }
          return errorHandler.serverResponse(
            res,
            'Account has not yet being verified',
            404,
          );
        }
        return errorHandler.serverResponse(
          res,
          'User is not yet registered with this email',
          404,
        );
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static currentProfile(userDetails, res) {
    if (userDetails) {
      const user = { isAuth: true, ...userDetails._doc };
      Reflect.deleteProperty(user, 'password');
      return user;
    }
    return errorHandler.serverResponse(res, 'User does not exist', 400);
  }

  static async logOut(userDetails, res) {
    try {
      const result = await userRepository.updateUser(
        { _id: userDetails._id },
        { token: '' },
      );
      if (result) {
        return true;
      }
      return false;
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async uploadPicture(profilePicPath, userValue, res) {
    try {
      const { url } = await cloud.picture(profilePicPath);
      const { email } = userValue;
      if (url) {
        const doc = userRepository.updateUser({ email }, { profilePic: url });
        if (doc) {
          return doc;
        }
        return false;
      }
      return res.status(400).json('Something went wrong with the image upload');
    } catch (error) {
      LoggerInstance.error(error);
      throw error;
    }
  }

  static async uploadCv(cvUrl, userValue, res) {
    try {
      if (!cvUrl) {
        return res.status(400).json('Please upload a file');
      }
      const { url } = await cloud.cv(cvUrl);
      const { _id } = userValue;
      console.log(url, 'cv url');
      if (url) {
        const doc = whiteCollarRepository.updateUser(_id, { cvUrl: url });
        if (doc) {
          return { doc, url };
        }
        return false;
      }
      return res.status(400).json('Something went wrong with the cv upload');
    } catch (error) {
      LoggerInstance.error(error);
      throw error;
    }
  }

  static async updateUserProfile(userDetails, res, userValue) {
    try {
      const result = Joi.validate(userDetails, validation.userUpdateSchema, {
        convert: false,
      });
      if (result.error === null) {
        const data = { ...userDetails };
        const { _id, userType } = userValue;
        switch (userType) {
          case 'whiteCollar':
            await whiteCollarRepository.updateUser(_id, userDetails);
            break;
          case 'blueCollar':
            blueCollarRepository.updateUser(_id, userDetails);
            break;
          case 'employer':
            employerRepository.updateUser(_id, userDetails);
            break;
          case 'client':
            console.log('jude is an client');
            break;
          case 'vendor':
            console.log('jude is an vendor');
            break;
          case 'admin':
            console.log('jude is an admin');
            break;

          default:
            break;
        }
        const searchFields = { _id };
        const doc = await userRepository.updateUser(searchFields, data);
        if (doc) {
          return doc;
        }
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      LoggerInstance.error(error);
      throw error;
    }
  }
}
