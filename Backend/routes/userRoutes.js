const express = require('express')
const router = express.Router()
const passport = require("passport");
const UserController = require('../Controllers/userController.js');
const TokenValidation = require('../Middleware/TokenValidation.js');

router.post("/verify_login_email",UserController.verifyUserEmail)
router.post("/login_with_email",UserController.VerifyEmailOTP)
router.post("/verify_with_number",UserController.VerifyUserNumber)
router.post("/login_with_number",UserController.LoginUser)

router.post("/verify_user",UserController.verifyNewUser)
router.post("/save_new_user",UserController.saveNewUser)

// router.post("/verify_email",UserController.sendEmail)
router.put("/update_user/:id",UserController.updateList)
router.delete("/delete_user/:id",UserController.deleteList)


// Google auth 
// initial google ouath login
// router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));

// router.get("/google/callback",passport.authenticate("google",{
//     successRedirect:"http://localhost:3000/dashboard",
//     failureRedirect:"http://localhost:3000/login"
// }))

// router.get("/login/success",async(req,res)=>{
//     console.log(req.user)
//     if(req.user){

//         res.status(200).json({message:"user Login",user:req.user})
//     }else{
//         res.status(400).json({message:"Not Authorized"})
//     }
// })

// router.get("/logout",(req,res,next)=>{
//     req.logout(function(err){
//         if(err){return next(err)}
//         res.redirect("http://localhost:3001");
//     })
// })

// End of Google auth

module.exports= router