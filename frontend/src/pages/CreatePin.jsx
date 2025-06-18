import React, { useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { LoadingAnimation } from '../components/Loading'
import { PinData } from '../context/PinContext';
import { useNavigate } from 'react-router-dom'

const CreatePin = () => {
  const inputRef = useRef(null)

  const { addPin, loading } = PinData()

  const handleClick = () => {
    inputRef.current.click()
  }

  const [file, setfile] = useState('')
  const [filePrev, setfilePrev] = useState('')
  const [title, settitle] = useState('')
  const [pin, setpin] = useState('')

 
  const navigate = useNavigate()

  const changeFileHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setfilePrev(reader.result)
      setfile(file)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("title", title)
    formData.append("pin", pin)
    formData.append("file", file)

    addPin(formData, setfilePrev, setfile, settitle, setpin, navigate)
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 mt-10'>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg'>

          {filePrev && <img src={filePrev} alt='this is preview image' />}
          <div className='flex flex-col items-center justify-center h-full cursor-pointer'>
            <input ref={inputRef} type="file" accept='image/*' className='hidden'
              onChange={changeFileHandler} />
            <div onClick={handleClick} className='w-12 h-12 mb-4 flex items-center justify-center bg-zinc-200 rounded-full'>
              <FaPlus />
            </div>
            <p className='text-zinc-500'>Choose a file</p>
          </div>

          <p className='mt-4 text-sm text-zinc-400'>we recommend using high quality .jpg files but less than 10mb</p>
        </div>
      </div>

      <div className='flex items-center justify-center bg-zinc-100'>
        <form className='w-full max-w-lg p-6 bg-white rounded-lg shadow-lg' onSubmit={submitHandler}>
          <div className='mb-4'>
            <label htmlFor="title" className='block text-sm font-medium text-zinc-700'>Title</label>
            <input
              value={title}
              onChange={(e) => { settitle(e.target.value) }}
              className='common-input' type="text" name="title" id="title" placeholder='Enter title' required />
          </div>

          <div>
            <label htmlFor="pin" className='block text-sm font-medium text-zinc-700'>Pin</label>
            <input
              value={pin}
              onChange={(e) => { setpin(e.target.value) }}
              className='common-input' type="pin" name="pin" id="pin" placeholder='Enter pin' required />
          </div>

          <button type='submit' className='common-btn mt-3' disabled={loading}>
            {loading ? <LoadingAnimation /> : "Add+"}
          </button>

        </form>
      </div>

    </div>
  )
}

export default CreatePin
