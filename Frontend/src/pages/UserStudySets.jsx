import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

function UserStudySets() {
    const {getUserInfo, user} = useContext(AuthContext);

    useEffect(() => {
        getUserInfo();
    }, [])

  return (
   <section>
    <h2>User Study Sets Page</h2>
    <h3>Study Sets</h3>
    <ul className='flex flex-col gap-[15px]'>
        {user?.savedStudySets?.map(studySet => (
            <li className='border-[1px] border-gray-400' key={studySet._id}>
                <p>Topic: {studySet.topicTitle}</p>
                <p>Title: {studySet.studySet.title}</p>
                <p>Description: {studySet.studySet.description}</p>
            </li>
        ))}
        
    </ul>
   </section>
  )
}

export default UserStudySets