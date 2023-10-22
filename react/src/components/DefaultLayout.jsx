import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { auth, setAuth, notification, user, setUser } = useStateContext();

    if (!auth) {
        return <Navigate to="/login" />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();
        await axiosClient.post("/logout");
        setUser("");
        setAuth(false);
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        Hello, <strong>{user.name}</strong>
                        <a onClick={onLogout} className="btn-logout" href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
