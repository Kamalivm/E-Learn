import express from 'express';
import { signup, login } from '../controllers/userController.js'; // import login from controller
import authenticateToken from '../utils/MiddleWare.js';

const router = express.Router();

// Use actual login function
router.post('/login', login);  

router.post('/signup', signup);
router.use(authenticateToken);  // protect all routes below this middleware
router.get('/', (req, res) => res.send("User route is working"));

export default router;
