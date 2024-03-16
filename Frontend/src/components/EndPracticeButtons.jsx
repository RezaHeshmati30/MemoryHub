import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserStudySetsContext } from '../context/UserStudySetsContext';

function EndPracticeButtons() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {setRound} = useContext(UserStudySetsContext);

    const onClickNextRound = () => {
        navigate(`/studySet/practice/${id}`);
        setRound(prev => prev + 1);
    }

    const onClickFinish = () => {
        navigate(`/user/studySets`);
        setRound(1);
    }

  return (
    <div className='flex gap-[20px] p-[20px]'>
        <button className='mb-10 bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border-2 ' onClick={onClickNextRound}>Next round</button>
        <button className='mb-10 bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border-2 ' onClick={onClickFinish}>Finish</button>
    </div>
  )
}

export default EndPracticeButtons