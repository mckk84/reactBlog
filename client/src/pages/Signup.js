import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userAuth from "../services/authApi";
import { useDispatch } from "react-redux";

function Signup() 
{
    const [isError, setisError] = useState(false);
    const [loginError, setloginError] = useState("");
    const [loginSuccess, setloginSuccess] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSignup(e) 
    {
        setloginSuccess("Signing up...");
        e.preventDefault();
        userAuth.register(name, email, password).then(result => {
            setisError(false);
            if( result.data.signUp === true )
            {
                setloginSuccess("Signup successful!!");   
                setTimeout(function(){
                    navigate("/login");
                }, 2000);
            } 
            else 
            {
                setloginSuccess("");
                setisError(true);
                setloginError(result.data.error);    
            }
        }).catch(err => {
            console.log(err);
            setisError(true);
            setloginError(err.message);
        });
        
    }
    return (
        <div className="min-h-screen container-xl pt-28 bg-gray-200 pb-28 mx-auto py-8">
            <div className="w-2/5 mx-auto border rounded-lg shadow-lg bg-white px-4 py-4">
                <form style={{ width: "100%" }} onSubmit={handleSignup}>
                    <h1 className="text-2xl mt-4 mb-4 text-center">Sign Up</h1>
                    {isError && <div className="w-full mb-2 px-4 py-2 text-center text-red-500">{loginError}</div>}
                    {loginSuccess !== "" && <div className="w-full mb-2 px-4 py-2 text-center text-blue-500">{loginSuccess}</div>}
                    <div className="mb-4 flex align-middle justify-center gap-10">
                        <label className="w-28 px-2 py-2" >Name</label>
                        <input type="text" className="px-2 border border-gray-400 rounded text-medium py-2" placeholder="Enter name" value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4 flex align-middle justify-center gap-10">
                        <label className="w-28 px-2 py-2" >Email</label>
                        <input type="email" className="px-2 border border-gray-400 rounded text-medium py-2" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4 flex align-middle justify-center gap-10">
                        <label className="w-28 px-2 py-2">Password</label>
                        <input type="password" className="px-2 border border-gray-400 rounded text-medium py-2" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex align-middle justify-center gap-10">
                        <button className="border rounded-lg bg-blue-400 px-4 py-2 text-white" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
