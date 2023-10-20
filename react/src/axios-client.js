import axios from "axios";
import { useStateContext } from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
});

export default axiosClient;
