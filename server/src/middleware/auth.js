const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded; // Attach user info (id, role) to request

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
       console.log("AuthMiddleware --> " , err )
    }
  };
};

module.exports = authMiddleware;