/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import userService from '../../services/userServices';

// eslint-disable-next-line consistent-return
export const auth = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.json({ status: 401, message: 'Access denied, No token provided' });

  const token = req.header('Authorization').replace('Bearer ', '');

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
