import React from 'react';
import search from "../assets/images/search.svg"

const StudySetsSearchBar = ({ value, onChange }) => {
    return (
      <form action="" className='flex justify-between w-full'>
        <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className='block basis-1/2  border-[1px] border-black p-[1.5em] rounded-[8px] mb-4'
      />
      <img src={search} alt="" />
      </form>
      
    );
  }

export default StudySetsSearchBar;
