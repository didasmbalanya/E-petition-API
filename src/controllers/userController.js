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
const { jwtSign, comparePassword } = AuthenticationHelper;
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
        } else {
          res.status(401).send({ status: 401, error: 'Different enrties in password and confirm password' });
        }
      } catch (error) {
        throw new Error('Unexpected');
      }
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const currentUser = await userService.findUserByEmail(email);
    if (!currentUser) {
      return res.status(404).json({ status: 404, error: 'email not found!' });
    }
    const checkPass = comparePassword(password, currentUser.password);

    if (!checkPass) {
      return res.status(404).json({ status: 404, error: 'incorrect password' });
    }
    const token = jwt.sign({ email: currentUser.email }, secret, { expiresIn: '3h' });
    const data = {
      status: 200,
      token,
      data: getPublicProfile(currentUser),
    };
    return res.status(200).json(data);
  }

  static async changeAdmin(req, res) {
    try {
      if (!req.params.id || typeof (parseInt(req.params.id)) !== 'number' || !req.query.isadmin) {
        throw Error();
      }
      if (req.user.is_admin === false) {
        return res.status(403).send({ status: 403, message: 'Forbidden, Only admin allowed' });
      }
      const foundUser = await db.users.findOne({ where: { id: Number(req.params.id) } });
      if (!foundUser) {
        return res.status(409).send({ status: 409, error: `User with id ${req.params.id} does not exists` });
      }
      if (req.query.isadmin === 'true' || req.query.isadmin === 'false') {
        const user = foundUser.dataValues;
        if (user.is_admin.toString() === req.query.isadmin) {
          return res.status(400).send({ status: 400, error: `user already has admin status ${req.query.isadmin}` });
        }
        if (user.is_admin !== req.query.isadmin) {
          await db.users.update({ is_admin: req.query.isadmin }, { where: { id: Number(req.params.id) } });
          return res.status(200).send({ status: 200, message: 'success' });
        }
      } else {
        return res.status(400).send({ status: 400, error: 'Invalid parameters' });
      }
    } catch (e) {
      res.status(400).send({ error: 'Bad request ' });
    }
  }

  static async fbSignIn(req, res) {
    const { user } = req.session.passport;
    const token = jwtSign({ email: user.email });
    res.status(200).json({ status: 200, token, data: user });
  }
}


export default UserController;
