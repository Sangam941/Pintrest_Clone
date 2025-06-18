import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const PinAuthContext = createContext()

export const PinContext = ({ children }) => {
  const [pins, setpins] = useState([])
  const [loading, setloading] = useState(true)

  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pin/allPins")

      setpins(data)
      setloading(false)
    } catch (err) {
      consle.log(err.message)
      setloading(false)
    }
  }

  useEffect(() => {
    fetchPins()
  }, [])

  const [SinglePin, setSinglePin] = useState([])

  async function fetchSinglePins(id) {
    setloading(true)
    try {
      const { data } = await axios.get("/api/pin/" + id)

      setSinglePin(data)
      setloading(false)

    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }


  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put("/api/pin/" + id, { title, pin })

      toast.success(data.message)
      fetchSinglePins(id)
      setEdit(false)

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  async function addComment(id, comment) {
    try {
      const { data } = await axios.post("/api/pin/comment/" + id, { comment })
      toast.success(data.message)
      fetchSinglePins(id)

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(`/api/pin/comment/${id}?commentId=${commentId}`)
      toast.success(data.message)
      fetchSinglePins(id)

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  async function deletePin(id, navigate) {
    setloading(true)
    try {
      const { data } = await axios.delete("/api/pin/" + id)
      toast.success(data.message)
      navigate("/")
      setloading(false)
      fetchPins()

    } catch (err) {
      toast.error(err.response.data.message)
      setloading(false)
    }
    
  }

   async function addPin(formData, setfilePrev, setfile, settitle, setpin, navigate) {
      setloading(true)
      try {
        const { data } = await axios.post('/api/pin/createPin', formData)

        toast.success(data.message)
        setfilePrev('')
        setfile('')
        settitle('')
        setpin('')
        fetchPins()
        navigate('/')
        setloading(false)
      } catch (err) {
        toast.error(err.response.data.message)
        setloading(false)
      }

    }

  return (
    <div>
      <PinAuthContext.Provider value={{ pins,fetchPins , fetchSinglePins, SinglePin, updatePin, addComment, deleteComment, deletePin, addPin }}>
        {children}
      </PinAuthContext.Provider>
    </div>
  )
}

export const PinData = () => { return useContext(PinAuthContext) }
