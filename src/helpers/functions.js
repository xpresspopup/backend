import userRepository from '../repository/auth';
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
}
