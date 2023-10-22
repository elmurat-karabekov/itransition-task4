import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [auth, setAuth] = useState(false);
    const [notification, _setNotification] = useState("");

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosClient.get("/api/v1/user");
            setUser(response.data);
            setAuth(true);
        } catch (error) {}
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                auth,
                setAuth,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
