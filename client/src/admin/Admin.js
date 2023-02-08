import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import blogs from "../services/blogApi";
import SideBar from "../components/Sidebar";

function Admin() 
{
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [latest_blogs, setBlogs] = useState([]);

    useEffect(() => 
    {
      console.log(user);
        if( !user ) {
            navigate('/login');
        }
        blogs.all().then( blogs => {
            console.log(blogs.data);
            setBlogs(blogs.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="container-xl bg-gray-200 mx-auto flex justify-start py-2">
            <aside className="min-h-screen lg:w-1/4 md:w-1/3 flex flex-col md:ml-auto px-0 w-full md:py-0 mt-8 md:mt-0">
                <SideBar page={Admin} />
            </aside>
            <div key="1" className="container px-2 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
              <div className="lg:w-3/4 md:w-2/3 rounded-lg overflow-hidden sm:mr-10 p-2 gap-10 flex flex-col justify-between relative">
                {latest_blogs.length} Blogs created.  
              </div>
            </div>
        </div>
    );
}

export default Admin;
