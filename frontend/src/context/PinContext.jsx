import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const PinAuthContext = createContext()

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const PinContext = ({ children }) => {
  const [pins, setpins] = useState([])
  const [loading, setloading] = useState(true)

  async function fetchPins() {
    try {
      const { data } = await api.get("/pin/allPins")

      setpins(data)
      setloading(false)
    } catch (err) {
      setloading(false)
      toast.error(err.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchPins()
  }, [])

  const [SinglePin, setSinglePin] = useState([])

  async function fetchSinglePins(id) {
    setloading(true)
    try {
      const { data } = await api.get("/pin/" + id)

      setSinglePin(data)
      setloading(false)

    } catch (error) {
      console.log(error)
      toast.error(err.response?.data?.message)
      setloading(false)
    }
  }


  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await api.put("/pin/" + id, { title, pin })

      toast.success(data.message)
      fetchSinglePins(id)
      setEdit(false)

    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  async function addComment(id, comment) {
    try {
      const { data } = await api.post("/pin/comment/" + id, { comment })
      toast.success(data.message)
      fetchSinglePins(id)

    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await api.delete(`/pin/comment/${id}?commentId=${commentId}`)
      toast.success(data.message)
      fetchSinglePins(id)

    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  async function deletePin(id, navigate) {
    setloading(true)
    try {
      const { data } = await api.delete("/pin/" + id)
      toast.success(data.message)
      navigate("/")
      setloading(false)
      fetchPins()

    } catch (err) {
      toast.error(err.response?.data?.message)
      setloading(false)
    }
    
  }

   async function addPin(formData, setfilePrev, setfile, settitle, setpin, navigate) {
      setloading(true)
      try {
        const { data } = await api.post('/pin/createPin', formData)

        toast.success(data.message)
        setfilePrev('')
        setfile('')
        settitle('')
        setpin('')
        fetchPins()
        navigate('/')
        setloading(false)
      } catch (err) {
        toast.error(err.response?.data?.message)
        setloading(false)
      }

    }

  return (
      <PinAuthContext.Provider value={{ pins,fetchPins , fetchSinglePins, SinglePin, updatePin, addComment, deleteComment, deletePin, addPin }}>
        {children}
      </PinAuthContext.Provider>
  )
}

export const PinData = () => { return useContext(PinAuthContext) }
