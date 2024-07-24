"use client"

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React from "react";

export default function VerifyPage() {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error(error.response.data);
        }
    }
    React.useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken);
        setToken(urlToken);
    },[]);

    React.useEffect(() => {
        if(token){
            verifyUserEmail();
        }
    },[token]);

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            {verified ? <h1>Your email has been verified</h1> : <h1>Verifying your email...</h1>}
            {error && <h1>There was an error verifying your email</h1>}
            <Link href="/"
            className="text-blue-500 mt-4 cursor-pointer"
            >Go back to home</Link>
        </div>
    )
}