import React from 'react'
import { PinData } from '../context/PinContext'
import PinCard from '../components/PinCard'

const Home = () => {
  const {pins , loading} = PinData()
  
  return (
    <div className='max-w-7xl mx-auto py-6 sm:px-6 lg-px-8'>
      <div className='px-4 py-6 sm:px-0'>
        
        <div className='flex flex-wrap m-4'>
          {
            pins && pins.length>0? pins.map((item,index)=>{
              return <PinCard key={index} pin = {item}/>
            }) : <p>No Pins Yet</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
