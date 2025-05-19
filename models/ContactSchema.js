import mongoose,{Schema} from "mongoose"


const ContactSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mobile:{
        type:String,
        required:true,
        unique:true,
        minLength:[10,"Mobile number should be in 10 digits"]
    },
    Message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Contact = mongoose.model("Contact",ContactSchema)
export default Contact