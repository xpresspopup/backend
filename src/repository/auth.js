import { Container } from 'typedi';
import logger from '../loaders/logger';
import AuthService from '../services/auth';
export default class userRepository {
  static async signUp(req, res) {
    try {
      const userInput = req.body;
      logger.debug('Calling Sign-Up endpoint with body: %o', userInput);
      const { user } = await AuthService.signUp(userInput, res);

      return res.status(201).json({ message: 'Registration succesful', user });
    } catch (error) {
      logger.error(error);
    }
    return false;
  }

  static async signIn(req, res) {
    try {
      const userInput = req.body;
      logger.debug('Calling Sign-In endpoint with body: %o', userInput);
      const { user, token } = await AuthService.signIn(userInput, res);

      return res
        .status(201)
        .json({ message: 'Login success', user, token: `Bearer ${token}` });
    } catch (error) {
      logger.error(error);
    }
    return false;
  }

  static async currentProfile(req, res) {
    try {
      const userDetails = req.user;
      const user = await AuthService.currentProfile(userDetails, res);
      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
    }
  }

  static async logOut(req, res) {
    try {
      const userDetails = req.user;
      await AuthService.logOut(userDetails, res);
    } catch (error) {
      logger.error(error);
    }
    return false;
  }
}
