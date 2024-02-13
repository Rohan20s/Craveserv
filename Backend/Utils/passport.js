// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const passport = require("passport");
// const userModel = require("../models/userModel");

// passport.use(
// 	new OAuth2Strategy({
//         clientID:process.env.CLIENT_ID,
//         clientSecret:process.env.CLIENT_SECRET,
//         callbackURL:"/auth/google/callback",
//         scope:["profile","email"]
//     },
//     async(accessToken,refreshToken,profile,done)=>{
//         try {
//             let user = await userModel.findOne({googleId:profile.id});

//             if(!user){
//                 user = new userModel({
//                     googleId:profile.id,
//                     displayName:profile.displayName,
//                     email:profile.emails[0].value,
//                     image:profile.photos[0].value
//                 });

//                 await user.save();
//             }

//             return done(null,user)
//         } catch (error) {
//             return done(error,null)
//         }
//     }
//     )
// );

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });