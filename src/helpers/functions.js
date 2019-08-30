import userRepository from '../repository/auth';
import whiteCollarRepository from '../repository/whiteCollar';
import blueCollarRepository from '../repository/blueCollar';
import config from '../config';
export default class functions {
  static async updateUser(id, userInfo) {
    const searchFields = { _id: id };
    const fieldsToUpdate = { ...userInfo };
    const doc = await userRepository.updateUser(searchFields, fieldsToUpdate);
    if (doc) {
      return doc;
    }
    throw new Error('User not found');
  }

  static async calculateDistance(jobType, _id) {
    try {
      let distance = 0;
      let myUser;
      if (jobType === 'whiteCollar') {
        myUser = await whiteCollarRepository.getVerifiedWhiteCollarByUserId(
          _id,
        );
        const { subcriptionType } = myUser;
        switch (subcriptionType) {
          case 'diamond':
            distance = config.distance.diamondDistance;
            break;
          case 'premium':
            distance = config.distance.premiumDistance;
            break;
          case 'free':
            distance = config.distance.freeDistance;
            break;
          default:
            break;
        }
      }
      if (jobType === 'blueCollar') {
        myUser = await blueCollarRepository.getVerifiedBlueCollarByUserId(_id);
        distance = config.distance.agentDistance;
      }
      return parseInt(distance, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
}
