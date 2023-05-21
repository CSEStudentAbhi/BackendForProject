const mongoose=require('mongoose')
const contactSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        phone:{
            type:Number,
            require:true
        },
        message:{
            type:String,
            require:true
        },
        replay:{
            type:String,
            require:true
        }
    }
)

const comment=mongoose.model("comment", contactSchema)
module.exports=comment