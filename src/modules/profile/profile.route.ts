import express, { Router } from 'express';
import authMiddleWare, { UserRole } from '../../middleware/auth';
import { profileController } from './profile.controller';






const router:Router = express.Router();

router.get(
  "/me",
  authMiddleWare(UserRole.Customer, UserRole.Provider),
  profileController.getProfileInfo
);


export const profileRoute = router;
