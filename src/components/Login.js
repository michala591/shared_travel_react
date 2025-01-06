import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import UserContext from "../UserContext";
import { Link, useNavigate } from "react-router-dom"




const Login = () => {
    const { login, setLogin } = useContext(UserContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate()



    function doLogin() {
        const loginData = {
            username: userName,
            password: password,
        }
        setLoading(true);
        axios
            .post("http://127.0.0.1:8000/login/", loginData)
            .then((response) => {
                console.log(response.data.access)
                const token = jwtDecode(response.data.access)
                localStorage.setItem("token", response.data.access)
                setLogin(token)
                setMessage("Success to log in");
                setError("")
                setShowToast(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
                setError("Login Failed please try again")
                setMessage("")
                setShowToast(true);
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    }

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000); // Toast disappears after 3 seconds
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [showToast]);

    return (
        <div>
            <br></br>
            <br></br>
            <div className="container mt-5">
                <div className="trips-list">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                doLogin();
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">
                                        User Name
                                    </label>
                                    <input
                                        type="userName"
                                        className="form-control"
                                        id="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn invite-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                            <p class="text-center mt-3">Don't have an account? <Link to="/register" className="text-primary"> sign up </Link></p>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div
                    className="toast show position-fixed bottom-0 end-0 m-3"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className={`toast-header ${error ? "bg-danger" : "bg-success"} text-white`}>
                        <strong className="me-auto">Login</strong>
                    </div>
                    <div className="toast-body">
                        {error || message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
