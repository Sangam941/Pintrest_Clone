import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const UserAuthContext = createContext()

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const UserContext = ({ children }) => {
    const [user, setuser] = useState([])
    const [isAuth, setisAuth] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false)

    async function registerUser(name, email, password, navigate) {
        setbtnLoading(true)
        try {
            const { data } = await api.post("/user/register", { name, email, password })

            toast.success(data.message)
            setisAuth(true)
            setbtnLoading(false)
            navigate("/login")
        } catch (err) {
            toast.error(err.response?.data?.message)
            setbtnLoading(false)
            setisAuth(false)
        }
    }

    async function loginUser(email, password, navigate) {
        setbtnLoading(true)
        try {
            const { data } = await api.post("/user/login", { email, password })

            toast.success(data.message)
            setuser(data.user)
            setisAuth(true)
            setbtnLoading(false)
            navigate("/")
        } catch (err) {
            toast.error(err.response?.data?.message)
            setbtnLoading(false)
            setisAuth(false)
        }
    }

    const [loading, setloading] = useState(true)

    async function fetchUser() {
        try {
            const { data } = await api.get("/user/profile")
            setuser(data)
            setisAuth(true)
        } catch (err) {
            toast.error(err.response?.data?.message)
            setisAuth(false)
        } finally {
            setloading(false)
        }
    }

    async function followUser(id, fetchUserDetails) {
        try {
            const { data } = await api.get('/user/follow/' + id)
            toast.success(data.message)
            fetchUserDetails()
        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    }

    const logout = async (navigate) => {
        try {
            const { data } = await api.post('/user/logout')
            toast.success(data.message)
            navigate('/login')
            setisAuth(false)
            setuser([])

        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <UserAuthContext.Provider value={{ followUser, setisAuth, setuser, loginUser, registerUser, btnLoading, isAuth, user, loading , logout}}>
            {children}
        </UserAuthContext.Provider>

    )
}

export const UserData = () => { return useContext(UserAuthContext) }
