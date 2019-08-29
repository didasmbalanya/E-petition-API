import database from '../models';

class UserService {
  static async addUser(newUser) {
    const addedUser = await database.users.create(newUser);
    return addedUser;
  }

  static async findUserByEmail(userEmail) {
    const user = await database.users.findOne({ where: { email: userEmail } });
    if (!user) return null;
    return user.dataValues;
  }
}

export default UserService;
