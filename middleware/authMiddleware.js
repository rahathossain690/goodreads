const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = verified;

    next(); 
    
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token: Access Denied' });
  }
};

module.exports = auth;