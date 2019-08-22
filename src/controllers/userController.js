/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/UserServices';
import { getPublicProfile } from '../utils/userUtils';

const { secret } = process.env;
class UserController {
  static async signUp(req, res) {
    const foundUser = await userService.findUserByEmail(req.body.email);
    if (foundUser) {
      res.status(409).send({ error: `User with email ${req.body.email} already exists` });
    } else {
      try {
        req.body.is_admin = false;
        if (req.body.password === req.body.confirm_password) {
          req.body.password = bcrypt.hashSync(req.body.password, 8);
          const newUser = await userService.addUser(req.body);
          const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '3h' });
          res.status(201).send({ data: getPublicProfile(newUser), token });
        }
      } catch (error) {
        res.status(404).send(error);
      }
    }
  }
}

export default UserController;
