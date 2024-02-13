import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

function UserProfile() {
  const {getUserInfo, user} = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default UserProfile
