import express from "express";
import { followAndUnfollowUser, loginUser, logoutUser, myProfile, otherProfile, register } from "../controllers/authController.js";
import { isLoggedin } from "../middleware/isLoggedIn.js";
const router = express.Router()

router.post("/register", register)

router.post("/login", loginUser)

router.get("/profile", isLoggedin, myProfile)

router.get("/:id", isLoggedin, otherProfile)

router.get("/follow/:id", isLoggedin, followAndUnfollowUser)

router.post("/logout", isLoggedin, logoutUser)

export default router