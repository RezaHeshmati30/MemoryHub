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

//   useEffect(() => {
//     getUserInfo();
//     console.log("id", moduleId)
//     if (location.pathname === "/all-study-sets") {
//         getModulesData();
//     } else {
//         getModuleData(moduleId);
//     }
//     setShowLoginForm(false);
//     setShowSignUpForm(false);
//   }, []);
useEffect(() => {
    getUserInfo();
    console.log("id", moduleId);
    if (location.pathname === "/all-study-sets") {
        getModulesData();
        setShowLoginForm(false);
        setShowSignUpForm(false);
    } else {
        getModuleData(moduleId);
        setShowLoginForm(false); // You might want to set these based on your requirements
        setShowSignUpForm(false); // You might want to set these based on your requirements
    }
}, [location.pathname, moduleId]);

  const onClickHandler = (topicId, studySetId) => {
    navigate(`/studySet/${topicId}/${studySetId}`);
    setTopicId(topicId);
    setStudySetId(studySetId);
  };

  const studyData = location.pathname === "/all-study-sets" ? modulesData : moduleData;

  console.log("data", studyData)
  console.log("module", moduleData)
  console.log("modules", modulesData)

let filteredStudySets;

if (location.pathname === "/all-study-sets") {
    filteredStudySets = [].concat(...(modulesData || []).map(module => (module.topics || []).map(topic => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            return { ...topic, studySets: filteredSets };
        }
        return null;
    })).filter(filteredTopic => filteredTopic !== null));
    console.log("filtered:", filteredStudySets);
} else {
    filteredStudySets = (moduleData?.topics || []).map(topic => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            return { ...topic, studySets: filteredSets };
        }
        return null;
    }).filter(filteredTopic => filteredTopic !== null);
    console.log("filtered:", filteredStudySets);
}


const studySets = location.pathname === "/all-study-sets" ? (modulesData || []).reduce((accumulator, module) => {
    return accumulator.concat((module.topics || []).reduce((topicAccumulator, topic) => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            topicAccumulator.push(...filteredSets.map(set => ({ topicId: topic._id, topic: topic.title, ...set })));
        }
        return topicAccumulator;
    }, []));
}, []) : (moduleData?.topics || []).reduce((accumulator, topic) => {
    const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filteredSets.length) {
        accumulator.push(...filteredSets.map(set => ({ topicId: topic._id, topic: topic.title, ...set })));
    }
    return accumulator;
}, []);

console.log("Filtered Study Sets:", studySets); 


let top6MostShared;
if (!Array.isArray(studySets)) {
    console.error("Study sets is not an array.");
} else {
    studySets.sort((a, b) => b.shared - a.shared);
    top6MostShared = studySets.slice(0, 6);

    // Print the titles of the top 6 most shared study sets along with their topics and topic IDs
    console.log("Top 6 Most Shared Study Sets:", top6MostShared);
    top6MostShared.forEach(set => console.log(`Topic ID: ${set.topicId}, Topic: ${set.topic}, Title: ${set.title}`));
}


const goToSetHandler = (topicId, studySetId) => {
    navigate(`/studySet/${topicId}/${studySetId}`);
    setTopicId(topicId);
    setStudySetId(studySetId);
  };

const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

    
  return (
    <section className='flex flex-col p-[20px] bg-[#F6F7FB] max-container padding-container'>
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
        <h2 className='text-center text-[4em] mb-[1.6px]'>{location.pathname === "/all-study-sets" ? "All topics" : moduleData?.title}</h2>
        
            <ul className='flex justify-center gap-[5em] mb-[5.6em]'>
                {location.pathname === "/all-study-sets" ? (modulesData?.map(module => (
                    <li className='text-center dm-sans-medium text-[1.7em]' key={module._id}>{module?.title}</li>
                ))) : 
                (moduleData?.topics?.map(topic => (
                    <li className=' text-center dm-sans-medium text-[1.7em]' key={topic._id}>{topic?.title}</li>
                )))}
            </ul>
        

        <h2 className='text-center text-[4em] mb-[1.6px]'>Popular study sets</h2>
        <ul className='flex'>
            {top6MostShared?.map(studySet => (
                <li key={studySet._id}>
                    <p>{studySet.title}</p>
                    <p>{studySet.description}</p>
                    <p>{studySet.cards.length} cards</p>
                    <button onClick={() => goToSetHandler(studySet.topicId, studySet._id)}>Go to set</button>
                </li>
            ))}
        </ul>

        <ul className='flex gap-[10px] flex-wrap justify-between'>
            {filteredStudySets?.map(topic => (
                topic?.studySets.map(studySet => (
                    <li key={studySet._id} className='border-[1px] border-gray-300 basis-[30%]'>
                        <p className='cursor-pointer' onClick={() => goToSetHandler(topic._id, studySet._id)}>{studySet.title}</p>
                        <p>{studySet.description}</p>
                        {/* <button className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}
                            onClick={() => { addStudySetToUser(user._id, studySet._id, topic._id) }}
                        >Add to your set</button> */}
                    </li>
                ))
            ))}
        </ul>

    </section>
  );
}

export default StudySets;
