import React, { useState } from 'react';
import search from "../assets/images/search.svg"

const StudySetsSearchBar = ({ value, onChange }) => {
    const [onFocus, setOnFocus] = useState(false);

    return (
      <form action="" className='flex justify-center w-full mb-[4em]'>
        <div className='flex justify-between basis-1/2 bg-[#F6F7FB] border-[1px] border-black p-[1.5em] rounded-[8px]'>
        <input
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onChange}
          className='outline-none block w-full bg-[#F6F7FB]'
      />
      <img src={search} alt="" /> 
        </div>
       
      </form>
      
    );
  }

export default StudySetsSearchBar;
