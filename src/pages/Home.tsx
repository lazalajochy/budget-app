import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/request";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const decodeToken = async (token: string) => {
        const data = jwtDecode(token);
        await login(data?.sub as string, token as string);
    };

    const login = async (userId: string, googleToken: string) => {
        const response: { token: string } = await apiClient("/signin", { userId }, "POST");
        localStorage.setItem("token", response.token);

        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
            localStorage.setItem("googleToken", googleToken)
        }
    };

    return (
        <div className="container">
            <div>
                <h1>Welcome to Budget App</h1>
            </div>
            <div>
                <GoogleLogin
                    onSuccess={(response) => decodeToken(response.credential as string)}
                    onError={() => console.log("Error")}
                />
            </div>
        </div>
    )
};

export default Home;