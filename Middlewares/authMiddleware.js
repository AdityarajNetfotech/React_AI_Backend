
import jwt from 'jsonwebtoken';
import Recruiter from '../Models/Recruiter.js';
// or whatever your recruiter model is

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Recruiter.findById(decoded.id).select('-password'); // ✅ attaches user

      next();
    } catch (error) {
      console.error('Auth Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;