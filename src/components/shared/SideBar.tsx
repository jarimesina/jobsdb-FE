import React from "react";

export const SideBar: React.FC = ({children}) => {
  const items = [
    {
      routeName: 'My Profile'
    },
    {
      routeName: 'View/Find Jobs'
    },
    {
      routeName: 'Create Jobs'
    },
    {
      routeName: 'Edit Jobs'
    }
  ]
  return (
  <div className="flex flex-row" style={{ minHeight: '100vh'}}>
    <div className="w-1/6 bg-purple-500 h-screen" style={{ height: 'auto'}}>
      <ul className="text-white">
        {
          items.map((item, index)=> (
            <li key={index} className="ml-4 mt-4">{item.routeName}</li>
          ))
        }
      </ul>
    </div>
    <div className="w-5/6">
      {children}
    </div>
  </div>);
};
