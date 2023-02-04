const {Schema,model}= require('mongoose');

module.exports.Otp=model('Otp',Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
type:String,
required:true
    },
    createdAt:{type:Date,default:Date.now,index:{expires:300}}

    // After 5 min it will be deleted automatically
},{timestamps:true}))