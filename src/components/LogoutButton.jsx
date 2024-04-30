import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("signout tripped");
            navigate("/");
        }   catch (err) {
            console.log(err);
        }
    };

    return <button className="w-full rounded " onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;