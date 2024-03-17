import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { useNavigate } from 'react-router-dom';
import UserStudySetsSearchBar from '../components/UserStudySetsSearchBar';
import arrow from "../assets/arrow-forward.svg";


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
                                <h3 className='dm-sans-bold text-[2em] flex items-center'>{topicTitle}
                                <img src={arrow} alt="arrow" className='w-6 h-6 ml-3 rotate-45'/>
                                </h3>
                                <ul className='divide-y divide-slate-100'>
                                    {studySetsUnderTopic.map(studySet => (
                                        <li key={studySet._id} className='group flex items-center justify-between   '>
                                            <div onClick={() => onClickHandler(studySet._id, topicTitle)} className='flex items-center w-full justify-between cursor-pointer h-full px-4 py-3  group-hover:bg-gradient-to-r from-emerald-400 to-cyan-400 mr-36 rounded-l-lg hover:translate-x-2 transition duration-300'>
                                                    <p className='dm-sans-medium text-[1.7em]'>{studySet.studySet.title}</p>
                                                <p className='dm-sans-medium text-[1.4em] flex'>GO TO SET
                                                <img src={arrow} alt="arrow" className='w-5 h-5 ml-3'/>
                                                </p>
                                            </div>
                                            {studySet?.edit === "no" ? (
                                                <button onClick={() => handleDeleteStudySet(studySet._id)} className='bg-black text-[1.2em] text-white px-6 py-2 rounded-md hover:bg-white hover:text-black hover:border-black border-2'>Delete</button>
                                            ) : (
                                                <button onClick={() => onClickEdit(studySet._id)} className='bg-[#a95b5b] text-[1.2em] text-white px-8 py-2 rounded-md hover:bg-white hover:text-black hover:border-[#a95b5b] border-2'>Edit</button>
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
