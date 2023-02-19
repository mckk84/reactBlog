import React from "react";
import { useSelector } from "react-redux";

function UserBlock() 
{
    const user = useSelector((state) => state.user);
    
    return (
        <div className="flex align-middle justify-start bg-white border shadow-lg bg-grey-100 mb-4 px-2">
              <img alt="Avatar" src="/images/user.svg" className="mt-2 border w-10 h-10 inline-block" />
              <h2 className="text-gray-900 text-lg mb-1 px-4 py-4 mb-0 font-semibold title-font">{user ? user.name : ''}</h2>
        </div>
    );
}

export default UserBlock;
