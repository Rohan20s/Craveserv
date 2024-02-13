const otpModel = require('../models/otpModel');
const otpGenerator = require('otp-generator')


async function createOTP(email) {


    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  
    let result = await otpModel.findOne({ otp: otp });
  
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await otpModel.findOne({ otp: otp });
    }
  
    const otpPayload = { email, otp };
    const otpBody = await otpModel.create(otpPayload);
  
  
    return {
      success: true,
      message: 'OTP sent successfully',
      otp,
    }
  
  }
module.exports = createOTP