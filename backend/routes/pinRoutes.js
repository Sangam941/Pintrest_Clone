import express from 'express'
import { isLoggedin } from "../middleware/isLoggedIn.js";
import uploadfile from '../middleware/multer.js';
import {commentOnePin, createPin, deleteComment, deletePin, getAllpins, getSinglepin, updatePin} from '../controllers/pinController.js'
const router = express.Router()

router.post("/createPin", isLoggedin, uploadfile, createPin)

router.get("/allPins", isLoggedin, getAllpins)

router.get("/:id", isLoggedin, getSinglepin)

router.post("/comment/:id", isLoggedin, commentOnePin)

router.delete("/comment/:id", isLoggedin, deleteComment)

router.delete("/:id", isLoggedin, deletePin)

router.put("/:id", isLoggedin, updatePin)

export default router 