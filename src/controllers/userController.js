/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import userService from '../services/userServices';
import { getPublicProfile } from '../utils/userUtils';
import AuthenticationHelper from '../utils/AuthenticationHelper';

const { secret } = process.env;
const { signIn } = userService;
const { jwtSign } = AuthenticationHelper;
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
        throw new Error('Unexpected');
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
    return res.status(404).json({ status: 404, error: 'incorrect email or password' });
  }

  static async toAdmin(req, res) {
    try {
      if (!req.params.id || typeof (parseInt(req.params.id)) !== 'number') {
        throw Error();
      }
      if (req.user.is_admin === false) {
        return res.status(401).send({ status: 401, message: 'method not allowed', error: 'Only admin allowed' });
      }
      const foundUser = await db.users.findOne({ where: { id: Number(req.params.id) } });
      const user = foundUser.dataValues;
      if (!user) {
        return res.status(409).send({ status: 409, error: `User with id ${req.params.id} does not exists` });
      }
      if (user.is_admin === true) {
        return res.status(400).send({ status: 400, error: 'user is already an admin ' });
      }
      await db.users.update({ is_admin: true }, { where: { id: Number(req.params.id) } });
      return res.status(200).send({ status: 200, message: 'success' });
    } catch (e) {
      res.status(400).send({ error: 'Bad request' });
    }
  }

  static async fbSignIn(req, res) {
    const { user } = req.session.passport;
    const token = jwtSign(user.email);
    res.status(200).json({ status: 200, token, data: user });
  }
}


export default UserController;
