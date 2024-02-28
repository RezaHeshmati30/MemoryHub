import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';

function StudySetStatistic() {
    const {countCardsByStatus, round} = useContext(UserStudySetsContext);
    const {getUserInfo, user} = useContext(AuthContext);
    const {id} = useParams();
    const locate = useLocation();

    useEffect(() => {
        getUserInfo();
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    const cardsCount = studySet ? countCardsByStatus([studySet]) : { mastered: 0, needPractice: 0, notStudied: 0 };
    const userId = user?._id;
    const studySetId = studySet?._id;
    //console.log("STUDY SET:", studySet)
    //console.log("StudySetId:", studySetId)

    return (
        <section className='p-[30px] flex flex-col gap-[20px]'>
                {studySet && (
                    <>
                        <h2 className={locate.pathname === `/studySet/endPractice/${id}` ? "block" : "hidden"}>Round: {round}</h2>
                        <h2>Topic: {studySet.topicTitle}</h2>
                        <h3>Title: {studySet.studySet.title}</h3>
                        <h3>Description: {studySet.studySet.description}</h3>
                        <p>Mastered: {cardsCount.mastered}</p>
                        <p>Need practice: {cardsCount.needPractice}</p>
                        <p>Not studied: {cardsCount.notStudied}</p>     
                    </>
                )}
        </section>
    )
}

export default StudySetStatistic