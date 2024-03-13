import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { useNavigate } from 'react-router-dom';
import UserStudySetsSearchBar from '../components/UserStudySetsSearchBar';


function UserStudySets() {
    const { getUserInfo, user, savedStudySets, setSavedStudySets, hasToken } = useContext(AuthContext);
    const { setStudySetId, deleteSavedStudySet } = useContext(UserStudySetsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudySets, setFilteredStudySets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken) {
            getUserInfo();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const filteredSets = user?.savedStudySets?.filter(studySet =>
            studySet?.studySet?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudySets(filteredSets);
    }, [user, searchQuery]);

    const userId = user?._id;

    const onClickHandler = (id) => {
        setStudySetId(id);
        navigate(`/user/${userId}/studySet/${id}`);
    };

    const handleDeleteStudySet = async (studySetId) => {
        try {
            await deleteSavedStudySet(userId, studySetId);
            const updatedFilteredSets = filteredStudySets.filter(set => set._id !== studySetId);
            setFilteredStudySets(updatedFilteredSets);
        } catch (error) {
            console.error('Error deleting study set:', error);
        }
    };

    const onClickEdit = (setId) => {
        navigate(`/studySet/edit/${setId}`);
    };

    return (
        <>
            {hasToken && (
                <section className='flex flex-col gap-[20px]'>
                    <div className='flex justify-center'>
                        <UserStudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>

                    <ul className='flex flex-col gap-[15px] '>
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
                                <h3 className='dm-sans-bold text-[2em]'>{topicTitle}</h3>
                                <ul className='divide-y divide-slate-100'>
                                    {studySetsUnderTopic.map(studySet => (
                                        <li key={studySet._id} className='flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-300'>
                                            <div onClick={() => onClickHandler(studySet._id, topicTitle)} className='flex items-center justify-between cursor-pointer'>

                                                <div className="flex min-h-[2rem] items-center justify-center gap-0">

                                                    <p className='dm-sans-medium text-[1.7em]'>{studySet.studySet.title}</p>
                                                </div>
                                                {/* <p className='dm-sans-medium text-[1.4em]'>GO TO SET</p> */}
                                            </div>
                                            {/* <button onClick={() => handleDeleteStudySet(studySet._id)}>X</button> */}
                                            {studySet?.edit === "no" ? (
                                                <button onClick={() => handleDeleteStudySet(studySet._id)} className='bg-black text-[1.2em] text-white px-6 py-2 rounded-md'>Delete</button>
                                            ) : (
                                                <button onClick={() => onClickEdit(studySet._id)} className='bg-[#a95b5b] text-[1.2em] text-white px-6 py-2 rounded-md'>Edit</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );

}

export default UserStudySets;
