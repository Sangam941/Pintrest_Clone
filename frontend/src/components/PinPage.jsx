import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PinData } from '../context/PinContext'
import { LoadingScreen } from '../components/Loading'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams()
  const { fetchSinglePins, loading, SinglePin, updatePin, addComment, deleteComment, deletePin } = PinData()

  const [edit, setEdit] = useState(false)
  const [title, settitle] = useState("")
  const [pinValue, setpinValue] = useState('')
  const [comment, setcomment] = useState('')

  const handleEdit = () => {
    settitle(SinglePin.title)
    setpinValue(SinglePin.pin)
    setEdit(!edit)
  }

  const updateHandler = () => {
    updatePin(SinglePin._id, title, pinValue, setEdit)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    addComment(SinglePin._id, comment)
    setcomment('')

  }

  const deleteCommentHandler = (id)=>{
    if(confirm("Are you sure want to delete the comment")){
        deleteComment(SinglePin._id, id)
    }
  }

  const navigate = useNavigate()

  const deletePinHandler = ()=>{
    if(confirm("Are you sure want to delete this pin")){
      deletePin(SinglePin._id, navigate)
      console.log(SinglePin.title)
    }
    
  }

  useEffect(() => {
    fetchSinglePins(params.id)

  }, [params.id])


  return (
    <div>
      {
        SinglePin?.image?.url && <div className='flex flex-col items-center bg-zinc-100 p-4 min-h-screen'>
          {loading ? <LoadingScreen /> :
            <div className='bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl'>
              <div className='w-full md:w-1/2 bg-zinc-200 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none'>
                <img src={SinglePin.image.url} alt="this is single pin image"
                  className='object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-r-none' />
              </div>

              <div className='w-full md:w-1/2 p-6 flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-3 items-center'>

                    {
                      edit ?
                        <input type="text"
                          value={title}
                          onChange={(e) => { settitle(e.target.value) }}
                          placeholder='Enter title'
                          className='common-input'
                          style={{ width: "200px" }}
                        />
                        : <h1 className='text-2xl font-bold'>{SinglePin.title}</h1>
                    }
                    {
                      SinglePin.owner && SinglePin.owner._id === user._id &&
                      <button onClick={handleEdit}>
                        <FaEdit />
                      </button>
                    }
                  </div>

                  {SinglePin.owner && SinglePin.owner._id === user._id &&
                    <button 
                    onClick={deletePinHandler}
                    className='bg-red-500 text-white p-1 rounded-md'>
                      <MdDelete />
                    </button>
                  }

                </div>

                {
                  edit ?
                    <input type="text"
                      value={pinValue}
                      onChange={(e) => { setpinValue(e.target.value) }}
                      placeholder='Enter title'
                      className='common-input'
                      style={{ width: "200px" }}
                    />
                    : <p>{SinglePin.pin}</p>
                }

                {
                  edit && <button className='bg-red-500 text-white py-1 px-3 mb-2 rounded-md font-semibold'
                    style={{ width: "200px" }}
                    onClick={updateHandler}
                  >Update</button>
                }

                {
                  SinglePin.owner && <div className='flex items-center justify-between border-b pb-4'>
                    <div className='flex items-center justify-center'>
                      <Link to={`/user/${SinglePin.owner._id}`}>
                        <div className='rounded-full w-12 h-12 bg-zinc-300 flex items-center justify-center'>
                          <span className='font-bold text-xl'>{SinglePin.owner.name.slice(0, 1)}</span>
                        </div>
                      </Link>

                      <div className='ml-4'>
                        <h2 className='text-md font-semibold'>{SinglePin.owner.name}</h2>
                        <p className='text-sm text-zinc-500'>{SinglePin.owner.followers.length} Followers</p>
                      </div>
                    </div>
                  </div>
                }

                <div className='flex items-center mt-2 justify-between gap-3'>
                  <div className='rounded-full w-12 h-12 bg-zinc-300 flex items-center justify-center'>
                    <span className='font-bold text-xl'>{user.name.slice(0, 1)}</span>
                  </div>

                  <form className='flex flex-1 gap-3' onSubmit={(e) => { submitHandler(e) }}>
                    <input type="text"
                      className='flex-1 border rounded-lg p-2'
                      required placeholder='Enter comment'
                      value={comment}
                      onChange={(e) => {
                        setcomment(e.target.value)
                      }} />


                    <button type="submit" className='bg-red-500 px-4 py-2 rounded-md text-white'>Add+</button>

                  </form>
                </div>

                <hr className='font-bold text-zinc-400 my-2' />

                <div className='overflow-y-auto relative h-48 p-2' id='scroll'>
                  {
                    SinglePin.comments && SinglePin.comments.length > 0 ? SinglePin.comments.map((e, index) => {
                      return (
                        <div key={index} className='flex items-center justify-between mb-2'>
                          <div className='flex items-center mb-2'>
                            <Link to={`/user/${e.user}`}>
                              <div className='rounded-full w-10 h-10 bg-zinc-300 flex items-center justify-center'>
                                <span className='font-bold text-xl'>{e.name.slice(0, 1)}</span>
                              </div>
                            </Link>

                            <div className='ml-4'>
                              <h2 className='text-md font-semibold'>{e.name}</h2>
                              <p className='text-sm text-zinc-500'>{e.comment}</p>
                            </div>
                          </div>

                          {e.user === user._id &&
                            <button 
                            onClick={()=>{deleteCommentHandler(e._id)}}
                            className='bg-red-500 text-white p-1 rounded-md flex items-center'>
                              <MdDelete />
                            </button>
                          }

                        </div>)
                    }) : <p>Be the first one to add comment</p>
                  }
                </div>

              </div>

            </div>}
        </div>
      }
    </div>
  )
}

export default PinPage
