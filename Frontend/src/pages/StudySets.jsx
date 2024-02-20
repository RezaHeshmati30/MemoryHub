import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function StudySets() {
  const {getModuleData, moduleData, setStudySetId, setTopicId, addStudySetToUser} = useContext(StudySetsContext);
  const {hasToken, getUserInfo, user} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getModuleData();
    getUserInfo();
  }, [])

  const onClickHandler = (topicId, studySetId) => {
   navigate("/studySet");
   setTopicId(topicId); 
   setStudySetId(studySetId);
  }

  return (
    <section className='flex flex-col items-center p-[20px]'>
      <h1>Study Sets</h1>
      <h2>{moduleData?.title}</h2>
      <ul>
        {moduleData?.topics?.map(topic => (
          <li key={topic._id} className='border-[1px] border-gray-400 p-[20px]'>
            <p  className='bg-gray-200 rounded-md p-1 text-center m-2'> Topic: {topic.title}</p>
            <ul className=''>
              {topic?.studySets.map(studySet => (
                <li key={studySet._id} className="border-2 border-gray-500 m-2 p-2 rounded-md">
                  <p Name='cursor-pointer bg-gray-100 rounded-md p-1 m-2' onClick={() => onClickHandler(topic._id, studySet._id)}>Subtopic: {studySet.title}</p>
                  <button className={`${hasToken ? "block" : "hidden"} bg-gray-200 py-[5px] px-[10px] rounded-[10px]`}
                   onClick={() => {addStudySetToUser(user._id, studySet._id, topic.title); navigate("/userProfile"); } }
                  >Add to your set</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
        
      </ul>
    </section>
  )
}

export default StudySets
