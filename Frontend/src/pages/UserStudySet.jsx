import React, { useContext, useEffect } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UserStudySet() {
    const {countCardsByStatus, deleteSavedStudySet, setStudySetId} = useContext(UserStudySetsContext);
    const {getUserInfo, user} = useContext(AuthContext);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    const cardsCount = studySet ? countCardsByStatus([studySet]) : { mastered: 0, needPractice: 0, notStudied: 0 };
    const userId = user?._id;
    const studySetId = studySet?._id;
    console.log("STUDY SET:", studySet)
    console.log("StudySetId:", studySetId)

    const onClickEdit = (setId) => {
        navigate(`/studySet/edit/${setId}`);
    }

    const onClickPractice = (setId) => {
        setStudySetId(studySetId);
        navigate(`/studySet/practice/${setId}`);
    }

    const onClickDelete = () => {
        deleteSavedStudySet(userId, studySetId);
        navigate("/user/studySets");
    }
    
  return (
    <section className='p-[30px] flex flex-col gap-[20px]'>
            {studySet && (
                <>
                    <h2>Topic: {studySet.topicTitle}</h2>
                    <h3>Title: {studySet.studySet.title}</h3>
                    <h3>Description: {studySet.studySet.description}</h3>
                    <p>Mastered: {cardsCount.mastered}</p>
                    <p>Need practice: {cardsCount.needPractice}</p>
                    <p>Not studied: {cardsCount.notStudied}</p>
                    <div className='flex gap-[20px]'>
                        {studySet.edit === "no" ? (
                            <button onClick={onClickDelete}  className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]'>Delete study set</button>
                        ) : (
                            <button onClick={() => onClickEdit(studySet._id)} className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]'>Edit study set</button>
                        )}
                        <button onClick={() => onClickPractice(studySet._id)} className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]'>Start practice</button>
                    </div>
                </>
            )}
        </section>
  )
}

export default UserStudySet