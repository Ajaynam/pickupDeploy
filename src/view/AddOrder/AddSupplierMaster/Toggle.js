
import React from 'react';

const Toggle = ({ label, active, onClick }) => {
  return (
    <button
      className={`px-4 py-2 mx-1  rounded-md  text-white ${active ? 'bg-blue-800 font-medium text-[#FFF73E]' : 'bg-gray-400'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Toggle;
