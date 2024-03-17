import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditBtns = (props) => {

  const navigate = useNavigate();
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const deleteSavedStudySet = async () => {
    try {
        const url = `${backendApiUrl}/user/${props.userId}/${props.setId}`;
        console.log("Delete URL:", url); 
        await axios.delete(url);
        alert("Study set was deleted");
        navigate(`/user/${props.userId}/studySets`);
    } catch (error) {
        console.log("Error while deleting study set:", error);
    }
};

  return (
    <div>
      <div className='flex items-center md:flex-row md:justify-end flex-col mx-auto  gap-8'>
        <button
          className='flex justify-center items-center  bg-white w-[172px] btn-hover-color h-[56px] p-[8px 16px]  text-black text-xs leading-120 uppercase cursor-pointer rounded-[8px] dm-sans-bold  '
          type='button'
          onClick={deleteSavedStudySet}
        >
          delete study set
        </button>
        <button
          className='flex justify-center  md: items-center   btn-hover-color  create-btn-color w-[172px] h-[56px] p-[8px 16px]  text-black text-xs leading-120 uppercase cursor-pointer rounded-[8px] dm-sans-bold  '
          type='submit'
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
}

export default EditBtns;
