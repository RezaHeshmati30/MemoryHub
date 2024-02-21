import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserStudySetsContext } from '../context/UserStudySetsContext';

function EndPracticeButtons() {
    const {id} = useParams();
    const navigate = useNavigate();

    const onClickNextRound = () => {
        navigate(`/studySet/practice/${id}`);
    }

    const onClickFinish = () => {
        navigate(`/user/studySets`);
    }

  return (
    <div className='flex gap-[20px] p-[20px]'>
        <button className='p-[15px] bg-blue-400 rounded-[8px]' onClick={onClickNextRound}>Next round</button>
        <button className='p-[15px] bg-blue-400 rounded-[8px]' onClick={onClickFinish}>Finish</button>
    </div>
  )
}

export default EndPracticeButtons