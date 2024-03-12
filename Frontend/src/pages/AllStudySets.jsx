import React, { useContext, useEffect, useState } from 'react';
import { StudySetsContext } from '../context/StudySetsContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import StudySetsSearchBar from '../components/StudySetsSearchBar';
import StudySets from '../components/StudySets';

function AllStudySets() {
  // const { setStudySetId, setTopicId, addStudySetToUser, getStudyData, studyData } = useContext(StudySetsContext);
  // const { hasToken, getUserInfo, user, setShowLoginForm, setShowSignUpForm } = useContext(AuthContext);
  // const [searchQuery, setSearchQuery] = useState('');
  // const navigate = useNavigate();

  // useEffect(() => {
  //   getUserInfo();
  //   getStudyData();
  //   setShowLoginForm(false);
  //   setShowSignUpForm(false);
  // }, []);

  // const onClickHandler = (topicId, studySetId) => {
  //   navigate(`/studySet/${topicId}/${studySetId}`);
  //   setTopicId(topicId);
  //   setStudySetId(studySetId);
  // };

  // const filteredStudySets = studyData?.topics?.reduce((acc, topic) => {
  //   const filteredSets = topic.studySets.filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
  //   if (filteredSets.length) {
  //     acc.push({ ...topic, studySets: filteredSets });
  //   }
  //   return acc;
  // }, []);

  return (
    // <section className='flex flex-col p-[20px]'>
    //   <div className='flex flex-col items-center'>
    //     <h1>All Study Sets</h1>
    //     <StudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    //   </div>
      
    //   <ul className='flex gap-[10px] flex-wrap'>
    //     {filteredStudySets?.map(topic => (
    //       <li key={topic._id} className='border-[1px] border-gray-400 rounded-[10px] p-[20px] basis-[30%]'>
    //         <p className='mb-[15px]'> Topic: {topic.title}</p>
    //         <ul className='flex flex-col gap-[15px]'>
    //           {topic.studySets.map(studySet => (
    //             <li key={studySet._id} className=''>
    //               <p className='cursor-pointer' onClick={() => onClickHandler(topic._id, studySet._id)}>Subtopic: {studySet.title}</p>
    //               <button className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}
    //                 onClick={() => { addStudySetToUser(user._id, studySet._id, topic._id) }}
    //               >Add to your set</button>
    //             </li>
    //           ))}
    //         </ul>
    //       </li>
    //     ))}
    //   </ul>

    // </section>
    <StudySets />
  );
}

export default AllStudySets;
