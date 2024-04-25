import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";

const LogoutButton = () => {
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedOut(true);
        }   catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user && isLoggedOut) {
                console.log("User is logged out");
                navigate("/");
            }
        });

        return () => {
            unsubscribe();
        };
    }, [isLoggedOut, navigate]);
    
   
    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;