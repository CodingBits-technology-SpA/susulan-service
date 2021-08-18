const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        index:{unique:true}
    },
    hashed_paswword:{
        type:String,
        required:true
    },
    salt:String,
    avatar:{
        type:String,
        default:''
    },
    role: [
         {
             type:ObjectId,
             ref:"Profile"
        } 
    ]
},
    {
        timestamps:true

});

userSchema
    .virtual("password")
    .set(function (password){
        this._password = password;
        this.salt = uuidv1();
        this.hashed_paswword = this.encryptPassword(password);
    }).get(function(){
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText){
        return this.encryptPassword(plainText) === this.hashed_paswword;
    },
    encryptPassword: function(password){
        if (!password) return "";

        try {
            return crypto
                    .createHmac("sha1",this.salt)
                    .update(password)
                    .digest("hex")

        } catch (error) {
            return error;
        }
    },
    toJsonResponse: function(){
        let user = this;
        let userObject = user.toObject();

        delete userObject.hashed_paswword;
        delete userObject.salt;

        return userObject;
    }
}
module.exports = mongoose.model("User",userSchema);

