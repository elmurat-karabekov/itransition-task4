import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const { setUser } = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        try {
            const response = await axiosClient.post("/signup", payload);
            setUser(response.data.data.user);
        } catch (error) {
            error.response.status === 422
                ? setErrors(error.response.data.errors)
                : setErrors(["Something went wrong :( \nTry again later"]);
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for Free</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
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
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Repeat Password"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
