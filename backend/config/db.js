import mongoose from "mongoose";

const connectDB = mongoose.connect("mongodb://0.0.0.0/Pintrest_Clone")
.then(()=>{
    console.log("database connected successfully")
}).catch((error)=>{
    console.log(error)
})

export default connectDB