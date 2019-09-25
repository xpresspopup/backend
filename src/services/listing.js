import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/listing';
import Listing from '../models/Listing';
import errorHandler from '../helpers/errorHandler';
import emailService from './emailService2';
import emailTemplate from '../helpers/emailTemplates';
import config from '../config';
import functions from '../helpers/functions';
export default class ListingService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addBusiness(data, userDetails, res) {
    try {
      const { longitude, latitude } = data;
      const {
        email, id, firstname, lastname, title,
      } = userDetails;
      const obj = { ...data };
      obj.longitude = parseFloat(longitude, 10);
      obj.latitude = parseFloat(latitude, 10);
      const result = Joi.validate(obj, validation.listSchema, {
        convert: false,
      });
      if (result.error === null) {
        obj.createdBy = id;
        obj.location = {
          type: 'Point',
          coordinates: [obj.longitude, obj.latitude],
        };
        const listing = new Listing(obj);
        await listing.save();
        const name =					title !== null || '' || undefined
					  ? title
					  : `${firstname} ${lastname}`;
        const customerName =					typeof name !== 'undefined' ? name : 'esteemed customer';
        await emailService.sendText(
          email,
          'Business listing created, awaiting approval',
          emailTemplate.successfulListingCreated(customerName),
        );
        return true;
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }
}
