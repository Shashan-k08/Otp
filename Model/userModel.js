const {Schema,model}=require('mongoose');
const jwt=require('jsonwebtoken')

const userSchema= Schema(
    {
        number:{
            type : String,
            required:true
        }
    },{
        timestamps:true
    }
);
userSchema.methods.generateJWt= function(){
    const token = jwt.sign(
        {
            _id:this.id,
            number:this.number
        },process.env.JWt_SECRET_KEY,{
            expiresIn:"7d"
        }
    )
}
module.exports.User=model('User',userSchema);