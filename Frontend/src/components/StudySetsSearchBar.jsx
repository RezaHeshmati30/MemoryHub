import React from 'react'

export const StudySetsSearchBar = ({ value, onChange }) => {
    return (
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className='border-[1px] border-gray-400 p-[10px] mb-4'
      />
    );
  }
