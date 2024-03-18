import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import close from "../assets/images/close.svg"
import EndPracticeButtons from '../components/EndPracticeButtons'

function FinishPracticeWindow({correctAnswers, progress}) {
    const {countCardsByStatus, round} = useContext(UserStudySetsContext);
    const {getUserInfo, user} = useContext(AuthContext);
    const {setRound, isRoundFinished} = useContext(UserStudySetsContext);
    const {id} = useParams();
    const locate = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, [])

    const onClickFinish = () => {
        navigate(`/user/studySets`);
        setRound(1);
    }

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    const cardsCount = studySet ? countCardsByStatus([studySet]) : { mastered: 0, needPractice: 0, notStudied: 0 };
    const userId = user?._id;
    const studySetId = studySet?._id;

    return (
        <>
                {studySet && (
                    <div className={`${isRoundFinished ? "block" : "hidden"} bg-white z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[80%] w-[430px] p-[24px] border-[1px] rounded-[8px] border-[#BCC0C1] mx-auto`}>
                        <div className='flex justify-between border-b-[#BCC0C1] border-b-[1px] py-[10px] mb-[24px]'>
                            <h2 className='text-[3.2em]'>Finish</h2>
                            <img onClick={onClickFinish} className='cursor-pointer' src={close} alt="finish" />
                        </div>
                        <h3 className={"block text-[2em] dm-sans-medium mb-[34px]"}>Number of rounds: {round}</h3>
                        <div className={`${locate.pathname === `/studySet/practice/${id}` ? "flex" : "hidden"} text-[1.7em] mb-[56px] flex-col gap-[27px]`}>
                            <div className='flex justify-between'>
                                <p>Mastered</p>
                                <p>{cardsCount.mastered} cards</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Need practice</p>
                                <p>{cardsCount.needPractice} cards</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Not studied</p>
                                <p>{cardsCount.notStudied} cards</p> 
                            </div>  
                        </div>   
                        <div className={`${locate.pathname !== `/studySet/practice/${id}` ? "flex flex-col" : "hidden"} text-[1.7em] gap-[27px] mb-[56px]`}>
                            <p>You answered {correctAnswers} out of {studySet?.cards?.length} {correctAnswers > 1 ? "questions" : "question"} correctly</p>
                            <p>Your progress: {progress}%</p>
                        </div>
                           <EndPracticeButtons />
                    </div>
                )}
       </> 
    )
}

export default FinishPracticeWindow