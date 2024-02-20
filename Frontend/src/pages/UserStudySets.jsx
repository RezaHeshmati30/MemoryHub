import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { useNavigate } from 'react-router-dom';


function UserStudySets() {
    const {getUserInfo, user} = useContext(AuthContext);
    const {setStudySetId} = useContext(UserStudySetsContext);

    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, [])

    const onClickHandler = (id) => {
        setStudySetId(id);
        navigate(`/user/studySet/${id}`);
    }

  return (
   <section className='flex flex-col gap-[20px]'>
    <h2>User Study Sets Page</h2>
    <h3>Study Sets</h3>
    <ul className='flex flex-col gap-[15px]'>
        {Object.entries(
            user?.savedStudySets?.reduce((groups, studySet) => {
                const topicTitle = studySet.topicTitle;
                if (!groups[topicTitle]) {
                    groups[topicTitle] = [];
                }
                groups[topicTitle].push(studySet);
                return groups;
            }, {}) || {}
        ).map(([topicTitle, studySetsUnderTopic]) => (
            <li key={topicTitle}>
                <h3>{topicTitle}</h3>
                <ul>
                    {studySetsUnderTopic.map(studySet => (
                        <li key={studySet._id} className='border-[1px] border-gray-400 cursor-pointer' onClick={() => onClickHandler(studySet._id, topicTitle)}>
                            <p>Title: {studySet.studySet.title}</p>
                            <p>Description: {studySet.studySet.description}</p>
                        </li>
                    ))}
                </ul>
            </li>
        ))}
    </ul>
   </section>
  )
}

export default UserStudySets