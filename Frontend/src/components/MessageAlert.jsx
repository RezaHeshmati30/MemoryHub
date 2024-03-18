import React from "react";
import success from "../assets/images/test-success.svg";
import { useNavigate } from "react-router-dom";

function MessageAlert(props) {
  const navigate = useNavigate();

  return (
    <>
      {props.messageShow &&(
        <div className='relative flex flex-col justify-center items-center gap-5 mx-auto w-[316px] h-[279px] mb-6 rounded-lg bg-white flex-shrink-0 pl-[40px] border border-gray-300 '>
          <img src={success} alt='' className="w-20 h-20 mr-10 "/>
          <p className="text-center mr-10">{props.message}</p>
          <button 
            className="rounded-lg bg-[#FFC91E] w-[268px] h-[56px] self-center mr-10"
            onClick={() => navigate(`/user/${props.userId}/studySets`)}>
            <p className="dm-sans-bold text-white text-[1.2em] ">Ok</p>
          </button>
        </div>
      )}
    </>
  );
}

export default MessageAlert;
