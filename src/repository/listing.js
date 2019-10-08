import listingModel from '../models/Listing';
import listingUser from '../models/ListingUser';
export default class listingRepository {
  // constructor({ userModel, jobModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getAllBusiness(searchObject) {
    try {
      const result = await listingModel.find(searchObject);
      if (result) {
        return result;
      }
      throw new Error('Business not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findListingById(id) {
    try {
      const result = await listingModel.findOne({
        _id: id,
      });
      if (result) {
        return result;
      }
      throw new Error('No business listing for this category');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateBusinessListing(searchObject, updateObject) {
    try {
      const result = await listingModel.findOneAndUpdate(
        searchObject,
        updateObject,
      );
      if (result) {
        return result;
      }
      throw new Error(
        'Business not found or not same user created this catalogue',
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getListingWithinDistance(
    {
      latitude, longitude, distance, category,
    },
    searchObject,
  ) {
    try {
      const result = await listingModel.find({
        location: {
          $near: {
            $maxDistance: distance,
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          },
        },
        ...searchObject,
      });
      if (result) {
        return result;
      }
      throw new Error('No available listing within this region');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateListingUser(searchObject, updateObject) {
    try {
      const result = await listingUser.findOneAndUpdate(
        searchObject,
        updateObject,
      );
      if (result) {
        return result;
      }
      throw new Error('Listing User not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  // static async searchJobsByCategory(category) {
  //   try {
  //     const job = await jobModel.find({
  //       category,
  //       isValid: true,
  //       jobType: 'whiteCollar',
  //     });
  //     if (job) {
  //       return job;
  //     }
  //     throw new Error('No job with this category');
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
