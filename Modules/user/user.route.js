import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { validation } from "../../Middleware/validation.js";
import { mymulter, valodationObject } from "../../Services/localmulter.js";
import { asyncHandler } from "../../Utils/errorHandling.js";
import * as userController from "./user.controller.js";
import {
  signInValidation,
  signUpValidation,
  validateUpdateUser,
} from "./user.validation.js";

const router = Router();

router.post("/", validation(signUpValidation),asyncHandler(userController.signUp));
router.post("/login", validation(signInValidation), userController.signIn);
router.delete("/", auth(), userController.deleteUser);
router.get('/test',mymulter({
  customValidation:valodationObject.image,
  customPath:"user/test"}).single("image"),(req,res)=>{
  res.json({success:"done",file:req.file})
  })

router.patch('/uploadpic',auth(),mymulter({
  customValidation:valodationObject.image,
  customPath:"user/profile"
}).single("image"),userController.uploadProfile)



router.patch('/cover',auth(),mymulter({
  customValidation:valodationObject.image,
  customPath:"user/cover"
}).array("cover"),userController.coverPicts)




router.put(
  "/",
  auth(),
  validation(validateUpdateUser),
  userController.updateUser
);
router.get("/logout", auth(), userController.logOut);

export default router;
