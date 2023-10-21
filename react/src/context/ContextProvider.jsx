import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState("");
    const [notification, _setNotification] = useState("");

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosClient.get("/sanctum/csrf-cookie");
                const response = await axiosClient.get("api/v1/users");
                // Check if the response status code is 401
                if (response.status === 401) {
                    console.log(response.data.message);
                } else if (response.status === 200) {
                    // If the response status is 200, set authorized to true
                    setAuthorized(true);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <StateContext.Provider
            value={{
                authorized,
                setAuthorized,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
