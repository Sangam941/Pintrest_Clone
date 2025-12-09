import jwt from 'jsonwebtoken'

export const isLoggedin = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message : "you must loggin first"})
        }
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data){
            return res.json({messsage : "token expire"})
        }
        req.user = data
        next()

    } catch (error) {
        res.json({message : "error.message"})
    }
}