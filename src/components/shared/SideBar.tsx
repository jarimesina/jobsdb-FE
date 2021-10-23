import React from "react";

export const SideBar: React.FC = ({children}) => {
  return (
  <div className="flex flex-row h-full">
    <div className="w-1/6 bg-purple-500">
      <ul className="text-white">
        <li> My Profile </li>
        <li> View/Find Jobs </li>
        {/* this will have a detail page */}
        <li> Create Jobs </li>
        <li> asdf </li>
      </ul>
    </div>
    <div className="w-5/6">
      {children}
    </div>
  </div>);
};
