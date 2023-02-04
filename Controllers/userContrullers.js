const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');
const { User } = require('../Model/userModel');
const { Otp } = require('../Model/otpModel');
var jwt = require('jsonwebtoken');
module.exports.signUp = async (req, res) => {
    const user = await User.findOne({
        number: req.body.number
    });
    if (user) return res.status(400).send("User already registered")

const OTP = otpGenerator.generate(6, {  lowerCaseAlphabets: false,upperCaseAlphabets: false, specialChars: false });
const number = req.body.number;
console.log(OTP); 
axios.post(`https://2factor.in/API/V1/3f61d7d6-a493-11ed-813b-0200cd936042/SMS/6394640369/${OTP}/OTP1`)
const otp = new Otp({ number: number, otp: OTP });
const salt = await bcrypt.genSalt(10)
otp.otp = await bcrypt.hash(otp.otp, salt);
const result = await otp.save();
return res.status(200).send("Otp send successfully!");
}
module.exports.verifyOtp = async (req, res) => {
const otpHolder = await Otp.find({
    number: req.body.number
});
if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
const rightOtpFind = otpHolder[otpHolder.length - 1];
const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

if (rightOtpFind.number === req.body.number && validUser) {
    const user = new User(_.pick(req.body, ["number"]));
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({
        number: rightOtpFind.number
    });
    return res.status(200).send({
        message: "User Registration Successfull!",
        token: token,
        data: result
    });
} else {
    return res.status(400).send("Your OTP was wrong!")
}
}