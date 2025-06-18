import getDataUrl from "../utils/urlGenerator.js"
import cloudinary from 'cloudinary'
import {pinModel} from '../models/pinModel.js'
import { userModel } from "../models/userModel.js"

// create pins
export const createPin = async (req, res)=>{
    const {title, pin} = req.body

    const file = req.file
    const fileUrl = getDataUrl(file)

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content)

    let pins = await pinModel.create({
        title,
        pin,
        image:{
            id : cloud.public_id,
            url : cloud.secure_url,
        },
        owner : req.user.id,
    })

    res.json({message : "pin created"})
}

// get all the pins 
export const getAllpins = async (req,res)=>{
    try {
        let allPins = await pinModel.find().sort({createdAt : -1})

        res.json(allPins)

    } catch (err) {
        res.json({message : err.message})
    }
}

// get single pin
export const getSinglepin = async (req,res)=>{
    try {
        let pin = await pinModel.findOne({_id:req.params.id}).populate("owner", "-password")

        res.json(pin)
    } catch (err) {
        res.json({message : err.message})
    }
}

// for comment
export const commentOnePin = async (req,res)=>{
    try {
        let pin = await pinModel.findOne({_id:req.params.id})
        let user = await userModel.findOne({_id:req.user.id})

        if(!pin){
            return res.status(400).json({message : "No pin with this id"})
        }
        pin.comments.push({
            user: user._id,
            name: user.name,
            comment : req.body.comment
        })

        await pin.save()

        res.json({message : "comment added"})

    } catch (err) {
        res.json({message : err.message})
    }
}

//delete comment
export const deleteComment = async (req,res)=>{
    try {
        let pin = await pinModel.findOne({_id:req.params.id})

        if(!pin){
            return res.status(400).json({message : "No pin with this id"})
        }
        
        if(!req.query.commentId){
            return res.status(400).json({message : "please give comment id"})
        }
        const commentIndex = pin.comments.findIndex((item)=>{
            return item._id.toString() === req.query.commentId.toString()
        })

        if(commentIndex === -1){
            return res.status(400).json({message : "comment not found"})
        }

        const comment = pin.comments[commentIndex]
        if(comment){
            if(comment.user.toString() === req.user.id.toString()){
                pin.comments.splice(commentIndex, 1)

                await pin.save()
                return res.json({message : "comment deleted"})
            }else{
                return res.json({message : "you are not the owner of this comment"})
            }
        }else{
            return res.status(400).json({message : "no any comment available"})
        }

    } catch (err) {
        res.json({message : err.message})
    }
}

//delete pin
export const deletePin = async (req,res)=>{
    try {
        let pin = await pinModel.findOne({_id:req.params.id})

        if(!pin){
            return res.status(400).json({message : "No pin with this id"})
        }

        if(pin.owner.toString() === req.user.id.toString()){
            await cloudinary.v2.uploader.destroy(pin.image.id)

            await pinModel.deleteOne({_id:pin._id})

            res.json({message : "pin deleted"})
        }else{
            res.json({message : "you are not owner of this pin"})
        }

    } catch (err) {
        res.json({message : err.message})
    }
}

//update pin
export const updatePin = async (req,res)=>{
    try {
        let pin = await pinModel.findOne({_id:req.params.id})

        if(!pin){
            return res.status(400).json({message : "No pin with this id"})
        }

        if(pin.owner.toString() === req.user.id.toString()){
            pin.title = req.body.title,
            pin.pin = req.body.pin

            pin.save()

            res.json({message : "pin updated"})

        }else{
            res.json({message : "you are not owner of this pin"})
        }

    } catch (err) {
        res.json({message : err.message})
    }
}