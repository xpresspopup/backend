/* eslint-disable no-restricted-globals */
import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/listing';
import Listing from '../models/Listing';
import ListingUser from '../models/ListingUser';
import listingRepository from '../repository/listing';
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
        const updateObj = {
          $push: {
            listingPosted: listing._id,
          },
        };
        await listingRepository.updateListingUser({ userId: id }, updateObj);
        return true;
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async updateBusiness(data, userDetails, listingId, res) {
    try {
      const { longitude, latitude } = data;
      const { id } = userDetails;
      const obj = { ...data };
      obj.longitude = parseFloat(longitude, 10);
      obj.latitude = parseFloat(latitude, 10);
      const result = Joi.validate(obj, validation.updateListingSchema, {
        convert: false,
      });
      if (result.error === null) {
        obj.updatedBy = id;
        obj.location = {
          type: 'Point',
          coordinates: [obj.longitude, obj.latitude],
        };
        /** only a valid and approved business listing can be updated, once updated it has to be approved again */
        const doc = await listingRepository.updateBusinessListing(
          { _id: listingId },
          { ...obj, isApproved: false },
        );
        if (doc) return doc;
        return res.status(400).json({ message: 'Error updating business' });
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async updateListingCatalogue(catalogue, userDetails, listingId, res) {
    try {
      const { id } = userDetails;
      if (listingId === '' || listingId.trim().length !== 24) {
        throw new Error('Invalid id number');
      } else {
        const doc = await listingRepository.updateBusinessListing(
          { _id: listingId },
          this.updateCatalogue(catalogue),
        );
        if (doc) return doc;
        return res.status(400).json({ message: 'Error updating business' });
      }
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static updateCatalogue(catalogue) {
    if (typeof catalogue === 'string') {
      return {
        $push: {
          catalogue,
        },
      };
    }
    return {
      $push: {
        catalogue: { $each: catalogue },
      },
    };
  }

  static async approveListing(id, res) {
    try {
      const result = await listingRepository.updateBusinessListing(
        { _id: id },
        { isApproved: true, isValid: true },
      );
      if (result) return result;
      return res.status(400).json({ message: 'Error approving business' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getListingById(id, res) {
    try {
      const result = await listingRepository.findListingById(id);
      if (result) return result;
      return res
        .status(400)
        .json({ message: 'Error getting business listing' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getAllListing(type, res) {
    try {
      let searchObj;
      switch (type) {
        case 'all':
          searchObj = {};
          break;
        case 'unapproved':
          searchObj = { isApproved: false, isValid: false };
          break;
        case 'approved':
          searchObj = { isApproved: true, isValid: true };
          break;
        case 'invalid':
          searchObj = { isApproved: true, isValid: false };
          break;

        default:
          break;
      }
      const result = await listingRepository.getAllBusiness(searchObj);
      if (result) return result;
      return res.status(400).json({ message: 'Error approving business' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async listingWithin(listingDetails, res) {
    try {
      const {
        category, distance, latitude, longitude,
      } = listingDetails;
      if (!category || category.trim().length !== 24 || !distance) {
        return res
          .status(400)
          .json({ message: 'please supply a valid query parameter' });
      }
      if (isNaN(distance) || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
          message: 'distance, longitude or latitude must be a number',
        });
      }
      if (distance <= 0 || distance >= 20) {
        return res.status(400).json({
          message: 'distance must be within 1 - 20 ',
        });
      }
      const searchObject = { category, isValid: true };
      const result = await listingRepository.getListingWithinDistance(
        listingDetails,
        searchObject,
      );
      return result;
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async listingByCategory(res, category) {
    try {
      if (category === '' || category.trim().length !== 24) {
        return errorHandler.serverResponse(
          res,
          'please supply a valid category id',
          400,
        );
      }
      const listing = await listingRepository.searchListingByCategory(category);
      if (listing) {
        return listing;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
