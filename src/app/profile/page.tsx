"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "mongoose";


export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout success");
            router.push("/login");
            
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const getUserDetails = async () => {
        try {
            const { data } = await axios.get("/api/users/userdata");
            console.log(data.data);
            setUser(data.data);
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        } finally{
            console.log("User Details fetched");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <h2>{user?`${user.username}`:""}</h2>
            <p>Profile page content</p>
            <button
            onClick={getUserDetails}
            className="m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>
            <hr />
            <button 
            onClick={logout}
             className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             >Logout</button>
        </div>
    )
}