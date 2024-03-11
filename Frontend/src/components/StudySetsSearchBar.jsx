import React, { useState } from 'react';
import search from "../assets/images/search.svg"

const StudySetsSearchBar = ({ value, onChange }) => {
    const [onFocus, setOnFocus] = useState(false);

    return (
      <form action="" className='flex justify-center w-full mb-[6.4em]'>
        <div className='flex justify-between basis-1/2 bg-[#F6F7FB] border-[1px] p-[1.5em] border-black  rounded-[8px]'>
        <input
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          type="text"
          placeholder="Search for topics or keywords"
          value={value}
          onChange={onChange}
          className='text-[1.4em] outline-none block w-full bg-[#F6F7FB]'
      />
      <img src={search} alt="" /> 
        </div>
       
      </form>
      
    );
  }

export default StudySetsSearchBar;
