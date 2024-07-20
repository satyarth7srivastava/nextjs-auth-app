"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log(res.data);
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email && user.password && user.username){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!loading? "Signup" : "Loading"}</h1>
            <br />
            <label htmlFor="username">username</label>
            <input
                className="border border-gray-400 p-2 text-black" 
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id="username"
                placeholder="username"
            />
            <br />
            <label htmlFor="email">email</label>
            <input
                className="border border-gray-400 p-2 text-black"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email"
                placeholder="email"
            />
            <br />
            <label htmlFor="password">password</label>
            <input
                className="border border-gray-400 p-2 text-black"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                placeholder="password"
            />
            <br />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onSignup}>{buttonDisabled? "fill the fields" : "Signup"}</button>
            <Link className="m-2" href="/login">Visit Login</Link>
        </div>
    );
}