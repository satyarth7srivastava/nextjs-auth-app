"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", user);
            console.log(res.data);
            toast.success(res.data.message);
            router.push("/profile");
            
        } catch (error:any) {
            console.log("Login Failed",error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    React.useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!loading?"Login Page":"loading"}</h1>
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
                onClick={onLogin}>{buttonDisabled?"Plz enter":"Login"}</button>
            <Link className="m-2" href="/signup">Dont have an account</Link>
        </div>
    );
}