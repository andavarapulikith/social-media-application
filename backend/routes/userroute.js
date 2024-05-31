import express from 'express';
import authMiddleWare from '../middleware/authmiddleware.js';
import { deleteuser, followuser, getuser,unfollowuser,updateuser,getallusers } from '../controllers/usercontroller.js';
const router=express.Router();
router.get('/',getallusers);
router.get('/:id',getuser)
router.put('/:id',authMiddleWare,updateuser);
router.delete('/:id',deleteuser);
router.put('/:id/follow',authMiddleWare,followuser);
router.put('/:id/unfollow',authMiddleWare,unfollowuser);
export default router;