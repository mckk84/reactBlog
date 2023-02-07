import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userAuth from "../services/authApi";
import { useDispatch } from "react-redux";

function Login() 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogin(e) 
    {
        e.preventDefault();
        userAuth.login(email, password).then(result => {
            dispatch({ type:"LOGIN_SUCCESS", user:result });
            navigate("/");
        }).catch(err => console.log(err));
        
    }
    return (
        <div className="container mx-auto py-8">
            <div className="w-2/5 mx-auto border rounded-lg shadow-md bg-indigo-100 px-4 py-4">
                <form style={{ width: "100%" }} onSubmit={handleLogin}>
                    <h1 className="text-2xl mb-4 text-center">Login to your account</h1>
                    <div className="mb-2 flex align-middle justify-center gap-10">
                        <label className="w-28 px-2 py-2" >Email</label>
                        <input type="email" className="px-2 border border-gray-400 rounded text-medium py-2" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2 flex align-middle justify-center gap-10">
                        <label className="w-28 px-2 py-2">Password</label>
                        <input type="password" className="px-2 border border-gray-400 rounded text-medium py-2" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex align-middle justify-center gap-10">
                        <button className="border rounded-lg bg-blue-400 px-2 py-2" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;