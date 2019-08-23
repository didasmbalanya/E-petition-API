/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/userServices';
import Util from '../utils/Utils';
import { getPublicProfile } from '../utils/userUtils';

const { secret } = process.env;
const { signIn } = userService;
class UserController {
  static async signUp(req, res) {
    const foundUser = await userService.findUserByEmail(req.body.email);
    if (foundUser) {
      res.status(409).send({ status: 409, error: `User with email ${req.body.email} already exists` });
    } else {
      try {
        req.body.is_admin = false;
        if (req.body.password === req.body.confirm_password) {
          req.body.password = bcrypt.hashSync(req.body.password, 8);
          const newUser = await userService.addUser(req.body);
          const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '3h' });
          res.status(201).send({ status: 201, data: getPublicProfile(newUser), token });
        }
      } catch (error) {
        res.status(404).send({ status: 404, error });
      }
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const response = await signIn(email, password);

    if (response) {
      const data = {
        status: 200,
        token: response.token,
        data: getPublicProfile(response),
      };

      return res.status(200).json(data);
    }
    Util.setError(404, 'error occured while trying to log you in');
    return Util.send(res);
  }
}

export default UserController;
