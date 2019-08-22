/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import userService from '../services/UserServices';

// eslint-disable-next-line consistent-return
export const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.json({ status: 401, message: 'Access denied, No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.secret);
    const verifiedUser = await userService.findUserByEmail(decoded.email);
    if (!verifiedUser) throw Error();
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(401).send({ status: 401, message: 'invalid token' });
  }
};

export default auth;
