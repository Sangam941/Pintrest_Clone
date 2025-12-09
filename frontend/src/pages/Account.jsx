import React, { useState } from 'react'
import { PinData } from '../context/PinContext'
import PinCard from '../components/PinCard'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'

const Account = ({ user }) => {
  const { pins } = PinData()
  const { logout } = UserData()
  const navigate = useNavigate()

  let userPins
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id)
  }

  const logoutHandler = async () => {
    logout(navigate)
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='p-6 w-full'>
        <div className='flex items-center justify-center'>
          <div className='w-24 h-24 rounded-full bg-zinc-300 flex items-center justify-center'>
            <span className='text-3xl font-bold text-zinc-700'>{user.name.slice(0, 1)}</span>
          </div>
        </div>

        <h1 className='text-center text-2xl font-bold mt-4'>{user.name}</h1>
        <p className='text-center text-zinc-600 mt-2'>{user.email}</p>
        <div className='flex items-center justify-center text-zinc-600 mt-2 gap-3'>
          <p className='text-center'>{user.followers.length} followers</p>
          <p className='text-center'>{user.following.length} following</p>
        </div>

        <div className='flex justify-center mt-4 space-x-2'>
          <button onClick={logoutHandler} className='bg-zinc-200 px-4 py-2 rounded-md'>Logout</button>
        </div>

        <div className='mt-4 flex flex-wrap justify-center gap-4'>
          {
            userPins && userPins.length > 0 ?
              userPins.map((item, index) => {
                return <PinCard key={index} pin={item} />
              }) :
              <p>No Pins Yet</p>
          }
        </div>
      </div>

    </div>
  )
}

export default Account
