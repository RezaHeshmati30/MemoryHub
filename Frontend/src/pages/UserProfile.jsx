import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

function UserProfile() {
  const {getUserInfo, user} = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  }, [])
  return (
    <div className=''>
      <div className='flex flex-col items-center'>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
      <Link to="/">Back to home</Link>
    </div>
  )
}

export default UserProfile

