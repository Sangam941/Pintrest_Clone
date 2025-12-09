import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PinCard from '../components/PinCard'
import { PinData } from '../context/PinContext'
import { UserData } from '../context/UserContext'

const UserProfile = ({ user }) => {
    const params = useParams()
    const {pins} = PinData()
    const {followUser} = UserData()

    const [User, setUser] = useState('')
    const [isFollow, setIsFollow] = useState(false)

    async function fetchUserDetails() {
        try {
            const { data } = await axios.get(`/user/${params.id}`)
            setUser(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
      if(User.followers && User.followers.includes(user._id)){
        setIsFollow(true)
      }
    }, [User])
    
    useEffect(() => {
        fetchUserDetails()
    }, [params.id])

    const followHandler = () => {
        setIsFollow(!isFollow)
        followUser(User._id, fetchUserDetails)
    }

    let userPins
    if (pins) {
        userPins = pins.filter((pin) => pin.owner === User._id)
    }
    console.log(userPins)

    return (
        <>
            {
                User &&
                <div className='flex flex-col items-center justify-center'>
                    <div className='p-6 w-full'>
                        <div className='flex items-center justify-center'>
                            <div className='w-24 h-24 rounded-full bg-zinc-300 flex items-center justify-center'>
                                <span className='text-3xl font-bold text-zinc-700'>{User.name.slice(0, 1)}</span>
                            </div>
                        </div>

                        <h1 className='text-center text-2xl font-bold mt-4'>{User.name}</h1>
                        <p className='text-center text-zinc-600 mt-2'>{User.email}</p>
                        <div className='flex items-center justify-center text-zinc-600 mt-2 gap-3'>
                            <p className='text-center'>{User.followers.length} followers</p>
                            <p className='text-center'>{User.following.length} following</p>
                        </div>

                        <div className='flex justify-center mt-4 space-x-2'>
                            <button onClick={followHandler} className='bg-zinc-200 px-4 py-2 rounded-md'>
                                {isFollow ? "Unfollow" : "Follow"}
                            </button>
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
            }
        </>
    )
}

export default UserProfile
