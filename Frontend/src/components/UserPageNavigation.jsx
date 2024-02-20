import React from 'react'
import { Link } from 'react-router-dom'

function UserPageNavigation() {
  return (
    <section className='flex flex-col'>
        <Link to="/user/studySets">Study sets</Link>
        <Link to="/createSet" className=' bg-gray-400 py-[5px] px-[10px] rounded-md ml-5 '>Create new set</Link>
    </section>
  )
}

export default UserPageNavigation