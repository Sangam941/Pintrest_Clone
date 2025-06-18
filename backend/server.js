import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
import indexRouter from './routes/indexRouter.js'
import pinRouter from './routes/pinRoutes.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import path from 'path'

dotenv.config()
cloudinary.v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API,
    api_secret : process.env.CLOUD_SECRET,
})

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

//using routes
app.use("/api/", indexRouter)
app.use("/api/user", userRouter)
app.use("/api/pin", pinRouter)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get('*all', (req,res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})  

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})