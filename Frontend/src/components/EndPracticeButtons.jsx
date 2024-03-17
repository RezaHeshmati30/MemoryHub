import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';

function EndPracticeButtons() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {setRound, setIsRoundFinished, setCurrentIndex, setCorrectAnswers, setWrongAnswers, setProgress} = useContext(UserStudySetsContext);
    const {userId} = useContext(AuthContext);

    const onClickNextRound = () => {
        setCorrectAnswers(0);
        setWrongAnswers(0); 
        setProgress(0);
        setIsRoundFinished(false);
        setCurrentIndex(0);
        setRound(prev => prev + 1);
    }

    const onClickFinish = () => {
        navigate(`/user/${userId}/studySets`);
        setRound(1);
    }

    const btnStyle = "bg-black text-white py-[19px] px-[35px] rounded-[8px] uppercase text-[1.4em] dm-sans-bold border-[1px] border-transparent hover:bg-white hover:text-black hover:border-[1px] hover:border-black"

  return (
    <div className='flex gap-[20px] p-[20px]'>
        <button className='mb-10 bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border-2 ' onClick={onClickNextRound}>Next round</button>
        <button className='mb-10 bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border-2 ' onClick={onClickFinish}>Finish</button>
    </div>
  )
}

export default EndPracticeButtons