import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';

function PracticeButtons({currentSet}) {
    const {getUserInfo, user} = useContext(AuthContext);
    const {id} = useParams();
    const {currentIndex, backendApiUrl, handleNextCard} = useContext(UserStudySetsContext);
    const navigate = useNavigate();

    // const currentCardsSet = user?.savedStudySets?.filter(studySet => studySet?._id === id)[0]?.cards || [];
    const currentCard = currentSet[currentIndex];
    const currentCardId = currentCard?._id;
    //console.log("CurrentCard ID:", currentCardId)

    useEffect(() => {
        getUserInfo();
    }, [])

    const userId = user?._id;

    const onClickHandler = async(status) => {
        try {
            await axios.patch(`${backendApiUrl}/user/${userId}/${id}/${currentCardId}`, {
                newStatus: status
            });
            if (currentIndex === currentSet.length - 1) {
                navigate(`/studySet/endPractice/${id}`)
            } else {
                handleNextCard(currentSet);
            }
            
            console.log("Status changed");
        } catch (error) {
            console.log("error while changing status:", error);
        }
        
    }

  return (
    <div className='flex justify-end gap-[10px]'>
        <button onClick={() => onClickHandler("mastered")} className='bg-[#2ca055] p-[15px] rounded-[8px]'>mastered</button>
        <button onClick={() => onClickHandler("need practice")} className='bg-[#e7f33b] p-[15px] rounded-[8px]'>need practice</button>
        <button onClick={() => onClickHandler("not studied")} className='bg-[#b43434] p-[15px] rounded-[8px]'>not studied</button>
    </div>
  )
}

export default PracticeButtons