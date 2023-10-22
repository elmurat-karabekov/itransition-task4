import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser } = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const response = await axiosClient.post("/login", payload);
            setUser(response.data.data.user);
        } catch (error) {
            const response = error.response;
            response.status === 403
                ? setMessage(
                      "Sorry, you have been denied access to this resource. Contact your support team for further assistance and clarification."
                  )
                : response.status === 422
                ? setMessage(response.data.message)
                : setMessage(
                      "Invalid credentials. Please double-check your email and password, and try again."
                  );
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {message && (
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
