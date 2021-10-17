import React from "react";

export const SideBar: React.FC = ({children}) => {
  return (
  <div className=" flex flex-row h-screen">
    <div className="w-1/6 border-r-2 border-black">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div style={{ flexGrow:1}}>
      {children}
    </div>
  </div>);
};
