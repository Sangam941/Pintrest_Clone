import mongoose from 'mongoose'

const pinSchema = mongoose.Schema({
    title : {
        type:String,
        required : true,
    },
    pin : {
        type : String,
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    image : {
        id : String,
        url : String,
    },
    comments : [{
        user : {
            type : String,
            required : true,
        },
        name : {
            type : String,
            required : true,
        },
        comment : {
            type :String, 
            required : true,
        }
    }]
    
},
{
    timestamps : true
}
)

export const pinModel = mongoose.model("pin", pinSchema)