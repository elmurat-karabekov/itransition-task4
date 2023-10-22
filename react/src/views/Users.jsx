import { createRef, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const selectAllRef = createRef();

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`api/v1/users/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/api/v1/users");
            setLoading(false);
            setUsers(response.data.data);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                <button className="btn-add" onClick={(ev) => onBlockClick(u)}>
                    Unblock
                </button>
                <button className="btn-edit" onClick={(ev) => onBlockClick(u)}>
                    Block
                </button>
                &nbsp;
                <button
                    className="btn-delete"
                    onClick={(ev) => onDeleteClick(u)}
                >
                    Delete
                </button>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    ref={selectAllRef}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last login</th>
                            <th>Registration Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="select"
                                            className="checkbox"
                                        />
                                    </td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td></td>
                                    <td>{u.created_at}</td>
                                    <td>{u.active ? "active" : "blocked"}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
