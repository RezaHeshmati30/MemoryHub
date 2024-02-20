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
    <section className='flex justify-between p-[30px]'>
      <div>
        <UserPageNavigation />
      </div>
      <div className='basis-[75%] flex flex-col gap-[20px] bg-gray-200'>
      <div className='flex flex-col'>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
      <UserStatistic />
      <Link className="bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[10%]" to="/">Back to home</Link>
    </div>
    </section>
    
  )
}

export default UserProfile

