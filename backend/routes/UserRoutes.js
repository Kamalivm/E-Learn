import express from 'express';
import { signup, login } from '../controllers/userController.js'; 
import authenticateToken from '../utils/MiddleWare.js';

const router = express.Router();

router.post('/login', login);  

router.post('/signup', signup);
router.use(authenticateToken);  
router.get('/', (req, res) => res.send("User route is working"));

export default router;
