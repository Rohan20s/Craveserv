const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const createOTP = require("../Utils/createEmailOtp")
const otpModel = require("../models/otpModel")


class UserController {

    static verifyUserEmail = asyncHandler(async (req, res) => {

        const { email } = req.body
        const contacts = await User.findOne({ email })
        
        if(email=="" || email==null){
            res.status(403)
            throw new Error("please enter email")
        }

        if (contacts != null) {
            const response = await createOTP(email)
            res.status(200).send({ "message": response })
        }
        else {
            res.status(403)
            throw new Error("No user found with this email")
        }
    })


    static VerifyEmailOTP = asyncHandler(async (req, res) => {

        const { email, otp } = req.body;

        const data = await otpModel.find({ email })
        
        if(otp=="" || otp==null){
            res.status(403)
            throw new Error("Please enter OTP")
        }


        if (data.filter(e => e.otp == otp).length > 0) {

            const user = await User.findOne({ email })

            const accessToken = jwt.sign({ name: user.name, email: user.email, phone: user.phone }, "secret",
                { expiresIn: '1d' });

            res.status(200).send({ "token": accessToken, "user": user })
        }
        else {
            res.status(403)
            throw new Error("OTP is not valid")
        }

    })


    static VerifyUserNumber = asyncHandler(async (req, res) => {
        const { phone } = req.body

        const contacts = await User.findOne({ phone })
        

        if (contacts != null ) {
            res.status(200).send({ "message": contacts })
        }
        else {
            res.status(403)
            throw new Error("No user found with this number")
        }
    })


    static LoginUser = asyncHandler(async (req, res) => {

        const { phone } = req.body;

        const data = await User.findOne({ phone })
        

        if (data != null) {
            const accessToken = jwt.sign({ name: data.name, email: data.email, phone: data.phone }, "secret",
                { expiresIn: '1d' });
            res.status(200).send({ "token": accessToken, "user": data })
        }
        else {
            res.status(403)
            throw new Error("Sorry! Something went wrong . Please retry after sometime")
        }

    })

    // static sendEmail = asyncHandler(async (req, res) => {
    //     const { email } = req.body;

    //     if (checkUserPresent) {
    //         res.status(400);
    //         throw new Error("User is already registered")
    //     }

    //     const response =methods.createOTP(email)

    //     res.send(response)

    // })


    static verifyNewUser = asyncHandler(async (req, res) => {
        const { name, email, phone } = req.body

        const checkEmailPresent = await User.findOne({ email });
        const checkNumberPresent = await User.findOne({ phone });

        if (checkEmailPresent) {
            res.status(403)
            throw new Error(JSON.stringify({ "email": "Email is already registered" }))
        }
        else if (checkNumberPresent) {
            res.status(403)
            throw new Error(JSON.stringify({ "phone": "Number is already registered" }))
        }
        else {
            res.status(201).send({ "success": true })
        }
    })


    static saveNewUser = asyncHandler(async (req, res) => {
        const { name, email, phone } = req.body
         const db = await User.create({
            name,
            email,
            phone,
        })


        if(db!=null){
        const accessToken = jwt.sign({ name: db.name, email: db.email, phone: db.phone }, "secret", 
        { expiresIn: '1d' });

        return res.status(200).send({token:accessToken,user:db})
    }else{
        res.status(403)
        throw new Error("Something went wrong ! please try again later")
    }

    })

    static updateList = asyncHandler(async (req, res) => {
        const id = req.params.id
        const { name, email, phone } = req.body
        const data = await User.findOneAndUpdate(
            { _id: id },
            {
                name, email, phone
            },
        ).catch(e => {
            res.status(400)
            throw new Error("Data is not found")
        });

        res.status(200).send({ "Message": data })

    })

    static deleteList = asyncHandler(async (req, res) => {
        console.log(req.params.id, req.body)
        res.status(200).send({ "Message": "delete" })
    })

}


module.exports = UserController