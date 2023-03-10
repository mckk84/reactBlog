import React from "react";
import { useSelector, useDispatch } from "react-redux";
import userAuth from "../services/authApi";

function Header() 
{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function handleLogout() 
    {
        userAuth.logout();
        dispatch({ type:"LOGOUT"});
        window.location.href="/login";
    }

    return (
        <header className="text-gray-600 body-font border-b shadow-md">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-xl">Blog</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              
            </nav>
            {!user && (
                  <a className="text-xl" href="/login">Login</a>
              )}
            {user && (
                  <button className="text-xl text-red-500 cursor-pointer" onClick={handleLogout}>Logout</button>
              )}
          </div>
        </header>
    );
}

export default Header;
