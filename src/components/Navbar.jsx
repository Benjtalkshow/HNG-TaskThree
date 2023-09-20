import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setSearchTerm, onSearch }) => {
  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="my-5 px-5 sm:px-0">
    <form className="m-auto w-full sm:w-[70%] lg:w-[50%] border-[1px] border-blue-800 rounded-lg" onSubmit={handleSubmit}>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

      <FontAwesomeIcon icon={faMagnifyingGlass} />

    </div>
    <input
    type="search"
    onChange={handleInputChange}
      className="block focus:ring-2 focus:ring-gray-900 w-full p-4 pl-10 text-sm text-gray-900 border rounded-lg bg-gray-50 border-blue-500 shadow-sm"
      placeholder="Search Electronics, Gallery..."
    />

  </div>
  </form>
</div>
  );
};

export default Navbar;
