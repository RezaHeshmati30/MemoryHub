import React, { useContext, useEffect, useState } from 'react';
import { StudySetsContext } from '../context/StudySetsContext';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import StudySetsSearchBar from '../components/StudySetsSearchBar';
import arrow from "../assets/images/arrow-forward.svg";

function StudySets() {
  const { setStudySetId, setTopicId, addStudySetToUser, getModulesData, modulesData, getModuleData, moduleData } = useContext(StudySetsContext);
  const { hasToken, getUserInfo, user, setShowLoginForm, setShowSignUpForm } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const location = useLocation();
  console.log("id", moduleId)
  useEffect(() => {
    getUserInfo();
    console.log("id", moduleId)
    if (location.pathname === "/all-study-sets") {
        getModulesData();
    } else {
        getModuleData(moduleId);
    }
    setShowLoginForm(false);
    setShowSignUpForm(false);
  }, []);

  const onClickHandler = (topicId, studySetId) => {
    navigate(`/studySet/${topicId}/${studySetId}`);
    setTopicId(topicId);
    setStudySetId(studySetId);
  };

  const studyData = location.pathname === "/all-study-sets" ? modulesData : moduleData;

  console.log("data", studyData)
  console.log("module", moduleData)
  console.log("modules", modulesData)

  const filteredStudySets = studyData?.topics?.map(topic => {
    const filteredSets = topic.studySets.filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filteredSets.length) {
      return { ...topic, studySets: filteredSets };
    }
    return null;
    }).filter(filteredTopic => filteredTopic !== null);
    
  return (
    <section className='flex flex-col p-[20px] bg-[#F6F7FB]'>
        <div className='inline'>
            <Link to="/modules" className='inline-flex items-center gap-[22px] text-[1.2em] dm-sans-bold hover-link'>
                <div className=' border-[10px] border-transparent hover:border-[10px] hover:rounded-[50%] hover:border-[#FFC2FF] hover:bg-[#FFC2FF]'>
                    <img src={arrow} className='rotate-180 w-[20px]' width={20} alt="" />
                </div>
                Back
            </Link>
        </div>
        
        
        <div className='flex flex-col items-center'>
            <StudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      
        <ul className='flex gap-[10px] flex-wrap'>
            {filteredStudySets?.map(topic => (
                topic?.studySets.map(studySet => (
                    <li key={studySet._id} className='border-[1px] border-gray-300 basis-[30%]'>
                        <p className='cursor-pointer' onClick={() => onClickHandler(topic._id, studySet._id)}>{studySet.title}</p>
                        <p>{studySet.description}</p>
                        <button className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}
                            onClick={() => { addStudySetToUser(user._id, studySet._id, topic._id) }}
                        >Add to your set</button>
                    </li>
                ))
            ))}
        </ul>

    </section>
  );
}

export default StudySets;
