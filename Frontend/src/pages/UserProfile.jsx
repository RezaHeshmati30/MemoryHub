import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import UserStatistic from '../components/UserStatistic';
import UserPageNavigation from '../components/UserPageNavigation';

function UserProfile() {
  const {getUserInfo, user, hasToken} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, [])

  

  

  return (
    <section className='flex justify-between p-[30px]'>
      {hasToken ? (
        <>
          <div>
            <UserPageNavigation />
          </div>
          <div className='basis-[75%] flex flex-col gap-[20px] bg-gray-200 p-[30px]'>
          <div className='flex flex-col'>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <img src={user?.photo} alt="profile picture" className='w-[100px] h-[100px] rounded-full' />
          </div>
          <UserStatistic />
          <Link className="bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[10%]" to="/">Back to home</Link>
        </div>
    </>
    ) : (
      // <div>
      //   <p>You should be logged to see the content of this page</p>
      //   <button className='p-[15px] bg-slate-400 rounded-[8px]' onClick={() => navigate("/")}>Back to main</button>
      // </div>
      navigate("/")
      
    )}
      
    </section>
    
  )
}

export default UserProfile

