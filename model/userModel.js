const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
      
    },
    role:{
        type:String,
        default:"student",
enum:["student" ,"trainer" ,"superadmin"]
    },
    address:{
        type:Object,
        default:{}
    },
    image:{
        type:Object,
        default:{
            url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsirv.com%2Fhelp%2Farticles%2Fcustomized-error-images%2F&psig=AOvVaw0qGlvwLkBi9mJRDm_ZAqNi&ust=1667039893390000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIjXiNfdgvsCFQAAAAAdAAAAABAE"
        }
    }
    

},{
    collection:"users",
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema)