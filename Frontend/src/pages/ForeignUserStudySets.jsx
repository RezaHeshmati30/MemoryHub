import React, { useContext, useEffect, useState } from 'react';
import { StudySetsContext } from '../context/StudySetsContext';
import { useNavigate, useParams } from 'react-router-dom';

function ForeignUserStudySets() {
    const { getUserStudySets, userStudySets, getUserShortData, userShortData, setTopicId, setStudySetId } = useContext(StudySetsContext);
    const { userId } = useParams();
    const [groupedStudySets, setGroupedStudySets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserStudySets(userId);
        getUserShortData(userId);
    }, []);

    console.log("userStudysets", userStudySets)

    useEffect(() => {
        if (userStudySets && userStudySets?.savedStudySets) {
            const grouped = {};
            userStudySets?.savedStudySets?.forEach(studySet => {
                const topicTitle = studySet?.topic?.title; // Check if topic exists
                if (!grouped[topicTitle]) {
                    grouped[topicTitle] = [];
                }
                grouped[topicTitle].push(studySet);
            });
            setGroupedStudySets(grouped);
        }
    }, [userStudySets]);

    const onClickHandler = (topicId, studySetId) => {
        navigate(`/users/${userId}/topic/${topicId}/study-set/${studySetId}`);
        // setTopicId(topicId);
        // setStudySetId(studySetId);
      };

    return (
        <section className='p-[40px]'>
            {userStudySets && userShortData && (
                <div>
                    <div className='flex items-center gap-[10px] mb-[20px]'>
                        <img className='w-[100px] h-[100px] rounded-[50%]' src={userShortData?.photo} alt="" />
                        <h2>Study sets of <span className='font-bold'>{userShortData?.nickName}</span></h2>
                    </div>
                    <ul className='flex gap-[15px] flex-wrap'>
                        {Object.entries(groupedStudySets).map(([topic, studySets]) => (
                            <li key={topic} className='border-[2px] border-gray-400 p-[10px] basis-1/3'>
                                <h3 className='mb-[10px]'>{console.log("topic:",studySets)}{topic}</h3>
                                <ul className='flex flex-col gap-[10px]'>
                                    {studySets.map(studySet => (
                                        <li key={studySet._id} onClick={() => onClickHandler(studySet.topic._id, studySet.studySet._id)} className='border-[1px] rounded-[8px] border-gray-400 p-[10px]'>
                                            {studySet.studySet && ( 
                                                <>
                                                    <p>Title:{studySet.studySet.title}</p>
                                                    <p>Description: {studySet.studySet.description}</p>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default ForeignUserStudySets;

// studySet.topic._id,