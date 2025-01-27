import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify } from "react-icons/bs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface HeadersProps {
    OpenSidebar: () => void;
}

function Headers({OpenSidebar}: HeadersProps) {
    const [userData, setUserData] = useState<{ picture: string }>({
        picture: ""
      });
    const getUserData = () => {
        const token = localStorage.getItem("googleToken");
        if (token) {
            try {
                const userData = jwtDecode<{ picture: string }>(token as string);
                setUserData({ picture: userData?.picture });
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
    },[userData])

    return (
        <header className="header">
            <div className="menu-icon">
                <BsJustify className="icon" onClick={OpenSidebar} />
            </div>
            <div className="header-left">
            </div>
            <div className="header-right">
              
                {userData?.picture ? (
                    <img
                    src={userData?.picture}
                    style={{
                        width:"30px",
                        height:"30px",
                        borderRadius:"50%",
                        objectFit:"cover"
                    }}
                    className="icon"
                    />
                ): (
                    <BsPersonCircle className="icon" />
                )}
            </div>
        </header>
    );
};

export default Headers;