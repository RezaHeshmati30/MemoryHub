import React from 'react'
import { Link } from 'react-router-dom'

function UserPageNavigation() {
  return (
    <section className='flex flex-col'>
        <Link to="/user/studySets">Study sets</Link>
        <Link to="/createSet">Create new set</Link>
    </section>
  )
}

export default UserPageNavigation