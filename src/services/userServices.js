import database from '../models';

class userService {
  static async addUser(newUser) {
    const addedUser = await database.users.create(newUser);
    return addedUser;
  }

  static async findUserByEmail(userEmail) {
    const user = await database.users.findOne({ where: { email: userEmail } });
    if (!user) return false;
    return user;
  }
}
export default userService;
