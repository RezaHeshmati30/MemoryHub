import React from 'react'
import { Link } from 'react-router-dom'

function UserPageNavigation() {
  return (
    <section className='flex flex-col gap-[30px] border-[1px] border-gray-400 p-[20px]'>
        <h2>Account navigation:</h2>
        <Link to="/user/studySets">Study sets page</Link>
        <Link to="/createSet">Create new set page</Link>
        <Link to="/userProfileUpdate">Settings</Link>
    </section>
  )
}

export default UserPageNavigation