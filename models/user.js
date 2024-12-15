import mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already registered"]
    },
    phone:{
        type:String,  required:[true,"Phone is required"],
    },
    photo:{
        type:String
    }

},{timestamps:true})

const USER = mongoose.model("USER",UserSchema)
export default USER