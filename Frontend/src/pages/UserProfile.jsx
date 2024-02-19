import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import UserStatistic from '../components/UserStatistic';
import UserPageNavigation from '../components/UserPageNavigation';

function UserProfile() {
  const {getUserInfo, user} = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <section className='flex justify-between'>
      <div>
        <UserPageNavigation />
      </div>
      <div className=''>
      <div className='flex flex-col items-center'>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
      <Link className="bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]" to="/">Back to home</Link>
      <UserStatistic />
    </div>
    </section>
    
  )
}

export default UserProfile

