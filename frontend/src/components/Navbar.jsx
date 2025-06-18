import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({user}) => {
    return (
        <div className='bg-white shadow-sm py-2 px-4'>
            <div className="image flex items-center justify-between">
                <Link to="/" className='flex items-center'>
                    <img src="https://images.ctfassets.net/2pyx8rwuvz6x/6nxIq0PNCnI28hniJxENpw/0939b97c014ced06ebc0b939e2e3acb2/PIN_Company_Logo.png?fm=webp" alt="this is logo"
                        className='h-8' />

                    <span className='text-xl font-bold text-red-600'>Pintrest</span>
                </Link>

                <div className='flex items-center gap-5'>
                    <Link to="/" className='text-zinc-700 hover:text-zinc-950 font-medium active:scale-95'>Home</Link>
                    <Link to="/create" className='text-zinc-700 hover:text-zinc-950 font-medium active:scale-95'>Create</Link>
                    <Link to="/account" className='w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center text-xl text-zinc-700'>
                        {user.name.slice(0,1)}
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar
