import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
