import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/user';
import errorHandler from '../helpers/errorHandler';
import User from '../models/User';
export default class AuthService {
  static async signUp(userInput, res) {
    try {
      const result = Joi.validate(userInput, validation.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const { email } = userInput;
        const existUser = await User.findOne({ email });
        if (!existUser) {
          const user = new User(userInput);
          await user.save();
          return { user };
        }
        throw new Error('User already exist');
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async signIn(userInput, res) {
    try {
      const { email, password } = userInput;
      const result = Joi.validate(userInput, validation.signInUser, {
        convert: false,
      });
      if (result.error === null) {
        const user = await User.findOne({ email });
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            const { token } = await user.generateToken();
            return { token };
          }
          return res
            .status(400)
            .json({ loginSuccess: false, message: 'Password Incorrect' });
        }
        return res
          .status(404)
          .json({ loginSuccess: false, message: 'User Not Found' });
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static currentProfile(userDetails, res) {
    if (userDetails) {
      const {
        isAdmin, email, firstname, lastname,
      } = userDetails;
      const user = {
        isAdmin,
        isAuth: true,
        email,
        firstname,
        lastname,
      };
      return user;
    }
    return res.status(400).json({ message: 'User does not exist' });
  }

  static async logOut(userDetails, res) {
    try {
      LoggerInstance.info(userDetails._id);
      const { token } = await User.findOneAndUpdate(
        { _id: userDetails._id },
        { token: '' },
      );
      LoggerInstance.info(token);
      if (token === '') {
        return res.status(200).json({
          success: true,
          message: 'Log out succesfully',
        });
      }
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
    return false;
  }
}
