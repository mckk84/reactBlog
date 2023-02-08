import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import blogs from "../services/blogApi";
import SideBar from "../components/Sidebar";

function Users() 
{
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => 
    {
      console.log(user);
        if( !user ) {
            navigate('/login');
        }
        blogs.getUsers().then( users => {
            console.log(users.data);
            setUsers(users.data);
        }).catch(err => {
            console.log(err);
        });
    });

    return (
        <div className="container-xl bg-gray-200 mx-auto flex justify-start py-2">
            <aside className="min-h-screen lg:w-1/4 md:w-1/3 flex flex-col md:ml-auto px-0 w-full md:py-0 mt-8 md:mt-0">
                <SideBar />
            </aside>
            <div key="1" className="container px-2 py-0 mx-auto flex sm:flex-nowrap flex-wrap">
              <div className="w-full bg-white overflow-hidden sm:mr-10 p-2 gap-2 flex flex-col relative">
                <h2 className="font-semibold text-xl mb-0">Users</h2>
                <table className="w-full border">
                    <thead className="border">
                        <tr>
                            <th className="border text-sm border-gray-400 text-center bg-gray-200">Name</th>
                            <th className="border text-sm border-gray-400 text-center bg-gray-200">Email</th>
                            <th className="border text-sm border-gray-400 text-center bg-gray-200">isAdmin</th>
                            <th className="border text-sm border-gray-400 text-center bg-gray-200">Date</th>
                            <th className="border text-sm border-gray-400 text-center bg-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user) => ( 
                            <tr>
                                <td className="border text-sm text-center border-gray-400">{user.name}</td>
                                <td className="border text-sm text-center border-gray-400">{user.email}</td>
                                <td className="border text-sm text-center border-gray-400">{user.isAdmin}</td>
                                <td className="border text-sm text-center border-gray-400">{user.date}</td>
                                <td className="border text-sm text-center border-gray-400">
                                    <div className="flex justify-center gap-2">
                                        <a className="text-sm text-indigo-400" href="/EditUser/:id">Edit</a>
                                        <a className="text-sm text-red-400" href="/DeleteUser/:id">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

              </div>
            </div>
        </div>
    );
}

export default Users;
