import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/listing';
import Catalogue from '../models/Categories';
import errorHandler from '../helpers/errorHandler';
import emailService from './emailService2';
import emailTemplate from '../helpers/emailTemplates';
import config from '../config';
import functions from '../helpers/functions';
import cloud from './cloudinary';
export default class catalogueService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addCatalogue(data, userDetails, res) {
    try {
      const { id } = userDetails;
      const { title, amount } = data;
      if (!title || !amount) {
        return res
          .status(400)
          .json({ message: 'title and amount are required' });
      }
      const obj = { ...data };
      obj.createdBy = id;
      const catalogue = new Catalogue(obj);
      await catalogue.save();
      return true;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async getCatalogue(userDetails, res) {
    try {
      const { id } = userDetails;
      const catalogues = await Catalogue.find({ createdBy: id });
      return catalogues;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async updateCatalogue(data, id) {
    try {
      const catalogues = await Catalogue.findOneAndUpdate(
        { _id: id },
        { ...data },
      );
      return catalogues;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async deleteCatalogue(id) {
    try {
      const catalogues = await Catalogue.findOneAndDelete({ _id: id });
      return catalogues;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async getCatalogueById(id) {
    try {
      const catalogues = await Catalogue.findById(id);
      return catalogues;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async uploadPicture(profilePicPath, userValue, _id, res) {
    try {
      const { url } = await cloud.picture(profilePicPath);
      const { id } = userValue;
      if (url) {
        const doc = Catalogue.findOneAndUpdate(
          { _id, createdBy: id },
          { picture: url },
        );
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
}
