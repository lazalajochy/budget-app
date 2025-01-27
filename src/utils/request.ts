import axios from "axios";


const apiClient = async <T>(url:string, data:any, method:"GET" | "POST" | "PUT" | "DELETE", token: string = ""): Promise<T> => {
    const urlCompleted = import.meta.env.VITE_URL_API + url;
    const response = await axios({
        url: urlCompleted,
        method,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;

};

export default apiClient;

