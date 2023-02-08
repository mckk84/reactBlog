import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation  } from "react-router-dom";
import userAuth from "../services/authApi";

function AdminHeader() 
{
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => 
    {
        if( !user ) {
            navigate('/login');
        }
    });

    function handleLogout() 
    {
        userAuth.logout();
        dispatch({ type:"LOGOUT"});
        window.location.href="/login";
    }

    return (
        <header className="text-gray-600 body-font border-b shadow-md">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/" style={{color: (location.pathname==='/') && "red"}} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-xl">Home</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              
            </nav>
            <a href="/Admin" style={{color: (location.pathname==='/Admin') && "red"}} className="flex mr-3 title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-xl">Blog Admin</span>
            </a>
            {!user && (
                  <a className="text-xl" href="/login">Login</a>
              )}
            {user && (
                  <button className="text-xl text-red-400 cursor-pointer" onClick={handleLogout}>Logout</button>
              )}
          </div>
        </header>
    );
}

export default AdminHeader;
