import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function HomePageButtons() {
  const navigate = useNavigate();
  const {hasToken, setShowLoginForm} = useContext(AuthContext);
  
  const onClickHandler = () => {
    hasToken ? navigate("/createSet") : setShowLoginForm(true);
  }

  return (
   <section>
    <button onClick={() => navigate("/studySets")} className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] mr-[20px]'>Flash Cards</button>
    <button onClick={onClickHandler} className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] '>Create Cards</button>
   </section>
  )
}

export default HomePageButtons