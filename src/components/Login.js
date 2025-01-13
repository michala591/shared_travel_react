import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import UserContext from "../UserContext";
import { Link, useNavigate } from "react-router-dom"
import TokenContext from "../TokenContext";
import ShowToast from "./ShowToast";




const Login = () => {
    const { setLogin } = useContext(UserContext)
    const { setToken } = useContext(TokenContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");
    const navigate = useNavigate()



    function doLogin() {
        const loginData = {
            username: userName,
            password: password,
        }
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/login/", loginData)
            .then((response) => {
                const login = jwtDecode(response.data.access)
                const token = response.data.access
                setToken(token)
                localStorage.setItem("token", response.data.access)
                setLogin(login)
                setMessage("Success to log in");
                setError("")
                setToastType("success");
                setShowToast(true);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch((error) => {
                console.log(error)
                setError("Login Failed please try again")
                setMessage("")
                setShowToast(true);
                setToastType("error");
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    }

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
            <ShowToast
                show={showToast}
                message={error || message}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default Login;
