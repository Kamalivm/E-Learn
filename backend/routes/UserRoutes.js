import express from 'express';
import { signup, login , getUserDetails , handleUpdateGems} from '../controllers/userController.js'; 
import authenticateToken from '../utils/MiddleWare.js';
// import { updateMany } from '../modals/userSchema.js';

const router = express.Router();

router.post('/login', login);  

router.post('/signup', signup);
router.get('/details', authenticateToken, getUserDetails);
router.post('/update-gems', handleUpdateGems);
// router.post('/update-gems', updateuserpoints);
router.get('/', (req, res) => res.send("User route is working"));

export default router;
