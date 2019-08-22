import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { secret } = process.env;
const SaltRounds = 8;

class AuthHelper {
  static jwtSign(user) {
    const { email } = user;
    return jwt.sign({ email }, secret, { expiresIn: '3h' });
  }

  static jwtVerifiy(token) {
    const decoded = jwt.verify(token, secret);
    return decoded;
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SaltRounds));
  }
}

export default AuthHelper;
