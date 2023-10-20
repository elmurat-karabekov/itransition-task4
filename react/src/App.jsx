import { Link } from "react-router-dom";
import { createRef } from "react";
import axiosClient from "./axios-client";

function App() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const onClick = async (e) => {
        e.preventDefault();
        await axiosClient.get("api/v1/users");
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        await axiosClient.get("/sanctum/csrf-cookie");
        await axiosClient.post("/login", payload);
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login for Free</h1>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        {/* Already registered? <Link to="/login">Sign In</Link> */}
                    </p>
                </form>
                <button onClick={onClick} className="btn btn-block">
                    users
                </button>
            </div>
        </div>
    );
}

export default App;
