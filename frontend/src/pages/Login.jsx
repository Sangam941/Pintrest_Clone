import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/userContext'
import { LoadingAnimation } from '../components/Loading'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const {loginUser , btnLoading} = UserData()
  const navigate = useNavigate()

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log(email, password)
    loginUser(email, password, navigate)
    console.log(email, password)
    setemail("")
    setpassword("")
    
  }

  return (
    <div className='w-full h-screen bg-zinc-100 flex justify-center items-center'>
      <div className='w-full shadow-lg bg-white p-8 max-w-md rounded-md'>
        <div className="image flex justify-center">
          <img src="https://images.ctfassets.net/2pyx8rwuvz6x/6nxIq0PNCnI28hniJxENpw/0939b97c014ced06ebc0b939e2e3acb2/PIN_Company_Logo.png?fm=webp" alt="pintrest logo"
          className='h-12' />
        </div>
        <h2 className='text-2xl font-semibold text-center '>Log in to see more</h2>

        <form className='mt-5' onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-zinc-700'>Email</label>
            <input 
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            className='common-input' type="email" name="email" id="email" placeholder='example@gmail.com' required/>
          </div>
          
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-zinc-700'>Password</label>
            <input 
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            className='common-input' type="password" name="password" id="password" placeholder='password' required/>
          </div>

          <button type='submit' className='common-btn mt-3' disabled={btnLoading}>
            {btnLoading?<LoadingAnimation />:"Log in"}
          </button>
          
        </form>

        <div className='mt-6 text-center'>
          <div className='relative mb-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t-[1px] border-zinc-400'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-zinc-500'>OR</span>
            </div>
          </div>

          <div className='mt-4 text-center text-sm'>
            <span>
              Not on Pintrest yet? <Link to="/register" className='font-medium hover:underline'>Register</Link>
            </span>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Login
