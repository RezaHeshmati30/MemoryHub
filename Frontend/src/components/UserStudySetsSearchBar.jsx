import React, { useState } from 'react';

function UserStudySetsSearchBar({ value, onChange }) {
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

export default UserStudySetsSearchBar;
