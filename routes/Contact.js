import express from "express"
const router = express.Router()
import Contact from "../models/ContactSchema.js"



router.post("/contact",async(req,res)=>{
    const {Name,Email,Mobile,Message} = req.body
    if(!Name || !Email || !Mobile || !Message){
        res.status(400).json({message:"All fields are required"})
    }
    try{
            const isMessage = await Contact.findOne({Email})
            if(isMessage){
                res.status(300).json({message:"You have already submitted the form | Please wait until i review your message"})
            }
            const newForm = await Contact.create({
                Name,
                Email,
                Mobile,
                Message
            })
            await newForm.save()
            res.status(200).json({message:"Form submitted successfully",newForm})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})



export default router;