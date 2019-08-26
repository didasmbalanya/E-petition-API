import database from '../models';
import AuthenticationHelper from '../utils/AuthenticationHelper';

const { jwtSign, comparePassword } = AuthenticationHelper;
class UserService {
  static async addUser(newUser) {
    const addedUser = await database.users.create(newUser);
    return addedUser;
  }

  static async findUserByEmail(userEmail) {
    const user = await database.users.findOne({ where: { email: userEmail } });
    if (!user) return false;
    return user.dataValues;
  }

  static async signIn(email, pass) {
    // compare password
    const currentUser = await UserService.findUserByEmail(email);

    const checkPass = comparePassword(pass, currentUser.password);

    if (checkPass) {
      const { password, ...userWP } = currentUser;
      const token = jwtSign(userWP);
      return { token, ...userWP };
    }
    return null;
  }
}

export default UserService;
