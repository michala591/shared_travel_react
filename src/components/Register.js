import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate()


    function register() {
        const registerData = {
            username: username,
            password: password,
            email: email,
            user_type: userType,
            name: name,
            phone_number: phone,
        }
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/users/register/", registerData)
            .then((response) => {
                setMessage("Success to register");
                setError("")
                setShowToast(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
                setError("Register Failed please try again")
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
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                register();
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label"> User Name </label>
                                    <input type="username" className="form-control" id="username" value={username}
                                        onChange={(e) => setUserName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"> Password </label>
                                    <input type="password" className="form-control" id="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"> Email </label>
                                    <input type="email" className="form-control" id="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label"> Name </label>
                                    <input type="name" className="form-control" id="name" value={name}
                                        onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label"> Phone </label>
                                    <input type="phone" className="form-control" id="phone" value={phone}
                                        onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_type" className="form-label">User Type</label>
                                    <select className="form-select" id="user_type" value={userType}
                                        onChange={(e) => setUserType(e.target.value)} required>
                                        <option value="">Select User Type</option>
                                        <option value="DR">Driver</option>
                                        <option value="PA">Passenger</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="btn invite-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Work..." : "Register"}
                                </button>
                            </form>
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
                        <strong className="me-auto">Register</strong>
                    </div>
                    <div className="toast-body">
                        {error || message}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register