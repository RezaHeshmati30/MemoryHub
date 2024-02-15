import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function StudySets() {
  const {getStudySetData, studySet, setCardsId, setTopicId} = useContext(StudySetsContext);
  const {hasToken} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getStudySetData();
  }, [])

  const onClickHandler = (topicId, studySetId) => {
   navigate("/studySet");
   setTopicId(topicId); 
   setCardsId(studySetId);


  }

  return (
    <section className='flex flex-col items-center p-[20px]'>
      <h1>Study Sets</h1>
      <h2>{studySet?.title}</h2>
      <ul>
        {studySet?.topics?.map(topic => (
          <li key={topic._id} className='border-[1px] border-gray-400 p-[20px]'>
            <p className=''> Topic: {topic.title}</p>
            <ul className=''>
              {topic?.studySets.map(studySet => (
                <li key={studySet._id}>
                  <p onClick={() => onClickHandler(topic._id, studySet._id)}>Subtopic: {studySet.title}</p>
                  <button className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}>Add to your set</button>
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
