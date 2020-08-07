const mongoose=require('mongoose');
const loginSchema=new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const userModel=mongoose.model('userModel',loginSchema);
module.exports=userModel;
