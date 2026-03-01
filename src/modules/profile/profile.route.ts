import express, { Router } from 'express';
import authMiddleWare, { UserRole } from '../../middleware/auth';
import { profileController } from './profile.controller';






const router:Router = express.Router();

router.get(
  "/me",
  authMiddleWare(UserRole.Customer, UserRole.Provider),
  profileController.getProfileInfo
);

//update profile

router.patch("/update", authMiddleWare(UserRole.Customer), profileController.editProfile);

//get provider profile

router.get("/provider-profile/:providerId", profileController.getProviderProfile);


export const profileRoute = router;
