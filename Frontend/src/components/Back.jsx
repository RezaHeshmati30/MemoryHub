import React from "react";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate("/user/:id/studySets")}
        className='flex w-88 h-48 justify-start items-center gap-8 cursor-pointer '
      >
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M29.6598 24.8333H20.3515L24.4182 28.8999C24.7432 29.2249 24.7432 29.7583 24.4182 30.0833C24.0932 30.4083 23.5682 30.4083 23.2432 30.0833L17.7515 24.5916C17.4265 24.2666 17.4265 23.7416 17.7515 23.4166L23.2348 17.9166C23.3905 17.7605 23.6019 17.6729 23.8223 17.6729C24.0428 17.6729 24.2541 17.7605 24.4098 17.9166C24.7348 18.2416 24.7348 18.7666 24.4098 19.0916L20.3515 23.1666H29.6598C30.1182 23.1666 30.4932 23.5416 30.4932 23.9999C30.4932 24.4583 30.1182 24.8333 29.6598 24.8333Z'
            fill='black'
          />
        </svg>
        <p className='text-1.2em leading-100 uppercase dm-sans-bold'>back</p>
      </div>
    </div>
  );
}

export default Back;
