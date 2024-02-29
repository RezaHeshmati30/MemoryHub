import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { useNavigate, useParams } from 'react-router-dom';
import UserStudySetsSearchBar from '../components/UserStudySetsSearchBar';

function UserStudySets() {
    const {getUserInfo, user, savedStudySets, setSavedStudySets} = useContext(AuthContext);
    const {setStudySetId, deleteSavedStudySet} = useContext(UserStudySetsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        getUserInfo();
    }, [savedStudySets])

    const userId = user?._id;

    const onClickHandler = (id) => {
        setStudySetId(id);
        navigate(`/user/${userId}/studySet/${id}`);
    }

    const filteredStudySets = user?.savedStudySets?.filter(studySet =>
      studySet?.studySet?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteStudySet = async (studySetId) => {
        try {
            await deleteSavedStudySet(userId, studySetId);
            setSavedStudySets(prevFilteredSets =>
                prevFilteredSets.filter(set => set._id !== studySetId)
            );
        } catch (error) {
            console.error('Error deleting study set:', error);
        }
    };

    return (
        <section className='flex flex-col gap-[20px] p-[30px]'>
            <h2>User Study Sets Page</h2>
            <h3>Study Sets</h3>
            <div className='flex justify-center'>
                <UserStudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            
            <ul className='flex flex-col gap-[15px]'>
                {Object.entries(
                    (filteredStudySets || []).reduce((groups, studySet) => {
                        const topicTitle = studySet?.topic?.title;
                        if (!groups[topicTitle]) {
                            groups[topicTitle] = [];
                        }
                        groups[topicTitle].push(studySet);
                        return groups;
                    }, {}) || {}
                ).map(([topicTitle, studySetsUnderTopic]) => (
                    <li className='' key={topicTitle}>
                        <h3>{topicTitle}</h3>
                        <ul className='flex flex-col gap-[20px]'>
                            {studySetsUnderTopic.map(studySet => (
                                <li key={studySet._id} className='border-[1px] rounded-[4px] border-gray-400 cursor-pointer p-[10px] flex gap-[20px] w-[75%]'>
                                    <div onClick={() => onClickHandler(studySet._id, topicTitle)}>
                                        <p>Title: {studySet.studySet.title}</p>
                                        <p>Description: {studySet.studySet.description}</p>
                                    </div>
                                    <button onClick={() => handleDeleteStudySet(studySet._id)}>X</button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );

}

export default UserStudySets;
