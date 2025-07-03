import { useEffect, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
export default function Logout() {
    const [flag, setFlag] = useState(false);

    const handleLogout = async () => {
        setFlag(false);
        const res = await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });

        if (res.status === 200) {
            setFlag(true);
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-122 bg-gray-50 text-gray-800">
            {!flag ? (
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-medium">Logging you out...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 transition-all duration-300">                  
                            <LogoutIcon fontSize="large" />             
                    <p className="text-xl font-semibold">Successfully Logged Out</p>
                    <p className="text-gray-600 text-sm">We hope to see you again soon!</p>
                </div>
            )}
        </div>
    );
}