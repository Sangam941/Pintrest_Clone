import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import indexRouter from './routes/indexRouter.js'
import pinRouter from './routes/pinRoutes.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import connectDB from './config/db.js'
import cors from 'cors'

dotenv.config()

connectDB()

cloudinary.v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API,
    api_secret : process.env.CLOUD_SECRET, 
})

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: ['http://localhost:5173',
    'https://pintrest-clone-seven.vercel.app/'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//using routes
app.use("/api/", indexRouter)
app.use("/api/user", userRouter)
app.use("/api/pin", pinRouter) 

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})