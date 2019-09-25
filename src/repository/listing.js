import listingModel from '../models/Listing';
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
        isValid: true,
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
      throw new Error('Business not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  // static async getJobsWithinDistance(
  //   { latitude, longitude },
  //   searchObject,
  //   maxDistance,
  // ) {
  //   try {
  //     const job = await jobModel.find({
  //       $query: {
  //         isValid: true,
  //         ...searchObject,
  //       },
  //       location: {
  //         $near: {
  //           $maxDistance: maxDistance,
  //           $geometry: {
  //             type: 'Point',
  //             coordinates: [longitude, latitude],
  //           },
  //         },
  //       },
  //     });
  //     if (job) {
  //       return job;
  //     }
  //     throw new Error('No available job within this region');
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

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
