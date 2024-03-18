
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import arrow from "../assets/arrow.svg";
import forward from "../assets/forward.svg";

function HomePageButtons() {
  const navigate = useNavigate();
  const { hasToken, setShowLoginForm, setIsCreateCardsClicked } = useContext(AuthContext);
  
  const onClickHandler = () => {
    hasToken ? navigate("/createSet") : setShowLoginForm(true);
    setIsCreateCardsClicked(true);
  }

  return (

    <section className='pt-12 pb-4 mt-20 flex justify-between '>
      <button onClick={() => navigate("/all-study-sets")} className='bg-[#000] text-white rounded-[36px] flex justify-center items-center flex-shrink-0 w-48 h-16 text-white font-dm-sans font-bold text-base mr-10'>STUDY SETS</button>
      <button onClick={onClickHandler} className='bg-[#FFF] rounded-[36px] w-60 h-16 flex justify-center items-center flex-shrink-0 text-black font-dm-sans font-bold text-base'>
        CREATE CARDS
        <svg onClick={() => navigate("/")} className="w-8 h-8 ml-2">
          <image href={arrow} x="0" y="0" width="100%" height="100%" />
          <image href={forward} x="0" y="0" width="100%" height="100%" />
        </svg>
      </button>
    </section>

   

  )
}

export default HomePageButtons;



