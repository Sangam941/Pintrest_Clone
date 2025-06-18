import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { PinData } from './PinContext';

export const UserAuthContext = createContext()

export const UserContext = ({ children }) => {
    const [user, setuser] = useState([])
    const [isAuth, setisAuth] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false)

    const {fetchPins} = PinData()

    async function registerUser(name, email, password, navigate){
        setbtnLoading(true)
        try {
            const { data } = await axios.post("/api/user/register", { name, email, password })

            toast.success(data.message)
            setuser(data.user)

            setisAuth(true)
            setbtnLoading(false)
            navigate("/")
            fetchPins()
        } catch (err) {
            toast.error(err.response.data.message)
            setbtnLoading(false)
        }
    }

    async function loginUser(email, password, navigate) {
        setbtnLoading(true)
        try {
            const { data } = await axios.post("/api/user/login", { email, password })

            toast.success(data.message)
            setuser(data.user)
            setisAuth(true)
            setbtnLoading(false)
            navigate("/")
            fetchPins()
        } catch (err) {
            toast.error(err.response.data.message)
            setbtnLoading(false)
        }
    }

    const [loading, setloading] = useState(true)

    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/profile")
            setuser(data)
            setisAuth(true)
        } catch (err) {
            console.log("Not authenticated:", err.message)
        } finally {
            setloading(false) 
        }
    }

    async function followUser(id, fetchUserDetails){
        try {
            const {data} = await axios.get('/api/user/follow/'+ id)
            toast.success(data.message)
            fetchUserDetails()
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <div>
            <UserAuthContext.Provider value={{followUser, setisAuth,setuser, loginUser, registerUser, btnLoading, isAuth, user, loading }}>
                {children}
                <Toaster />
            </UserAuthContext.Provider>
        </div>
    )
}

export const UserData = () => { return useContext(UserAuthContext) }
