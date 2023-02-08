import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Sidebar(props) 
{
    console.log(props);
    const user = useSelector((state) => state.user);
    
    return (
        <div className="w-full border-r border-black bg-white shadow-lg">
          <ul className="list-none w-full flex flex-col items-center">
            <li className="py-2 w-full px-2">
                <a href="/Admin" style={{color: (props.page.name=='Admin') && "red"}} className="w-full text-left flex hover:text-blue-400 title-font font-medium text-gray-900 mb-4 md:mb-0">
                  <span className="ml-3">Dashboard</span>
                </a>
            </li>
            <li className="py-2 w-full px-2">
                <a href="/AdminBlogs" style={{color: (props.page.name=='AdminBlogs') && "red"}} className="w-full text-left flex hover:text-blue-400 title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                  <span className="ml-3">Blogs</span>
                </a>
            </li>
          </ul>
        </div>
    );
}

export default Sidebar;
