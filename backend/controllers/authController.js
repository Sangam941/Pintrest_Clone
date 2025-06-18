import { userModel } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"

// for register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json({message : "user already exist"})
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(400).json(err.message)
                }
                user = await userModel.create({
                    name,
                    email,
                    password: hash
                })
                let token = generateToken(user)
                res.cookie("token", token)
                res.json({
                    user,
                    message : "user register successfully"})
            })
        })
    } catch (error) {
        res.json({message : error.message})
    }
}

// for login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({message : "email or password is invalid"})
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user)
                res.cookie("token", token)
                res.json({user, message : "login successfully"})
            }
            else {
                return res.status(400).json({message : "email or password is invalid"})
            }

        })
    } catch (error) {
        res.json({message : error.message})
    }
}

// for my profile
export const myProfile = async (req, res)=>{
    let user = await userModel.findOne({email : req.user.email}).select("-password")
    res.json(user)
}

// for other's profile
export const otherProfile = async (req, res)=>{
    let user = await userModel.findOne({_id : req.params.id}).select("-password")
    res.json(user)
}

// for followers and following
export const followAndUnfollowUser = async (req,res)=>{
    try {
        let otherUser = await userModel.findOne({_id:req.params.id})
        let loggedInUser = await userModel.findOne({_id:req.user.id})

        if(!otherUser){
            res.status(400).json({message : "No user available with this id"})
        }

        if(otherUser._id.toString() === loggedInUser._id.toString()){
            return res.status(400).json({message : "You cannot follow yourself..."})
        }

        if(otherUser.followers.indexOf(loggedInUser._id) == -1){
            otherUser.followers.push(loggedInUser._id)
            loggedInUser.following.push(otherUser._id)

            await otherUser.save()
            await loggedInUser.save()

            res.json({message : "user followed successful"})
        }else{
            otherUser.followers.splice(otherUser.followers.indexOf(loggedInUser._id), 1)
            loggedInUser.following.splice(loggedInUser.following.indexOf(otherUser._id), 1)

            await otherUser.save()
            await loggedInUser.save()

            res.json({message : "user unfollowed successful"})
        }

    } catch (err) {
        res.json({message : err.message})
    }
}

//logout user
export const logoutUser = (req, res)=>{
    try {
        res.cookie("token","")
        res.json({message : "User logout successfully"})
        
    } catch (err) {
        res.json({message : err.message})
    }
}
