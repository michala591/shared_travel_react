import React, { useContext } from 'react'
import UserContext from '../UserContext'
import TokenContext from '../TokenContext'
import MyTripsContext from '../MyTripsContext'
import { useNavigate } from 'react-router-dom'

function MyAccountLink() {
    const { login, setLogin } = useContext(UserContext)
    const { token, setToken } = useContext(TokenContext)
    const { MyTrips, setMyTrips } = useContext(MyTripsContext)
    const navigate = useNavigate()


    function logout() {
        setLogin(null)
        setToken(localStorage.removeItem("token"))
        setMyTrips("")
        navigate("/")
    }
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-header">My Account</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <a href="#overview" className="text-decoration-none">Overview</a>
                        </li>
                        {login && login.user_type === "DR" && (
                            <li className="list-group-item">
                                <a href="#my-car" className="text-decoration-none">My Car</a>
                            </li>
                        )}
                        <li className="list-group-item">
                            <a href="#my-trips" className="text-decoration-none">My Trips</a>
                        </li>
                        <li className="list-group-item">
                            <a href="#settings" className="text-decoration-none">Settings</a>
                        </li>
                        <button
                            id="logout-button"
                            className="btn btn-danger mt-3 w-100"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MyAccountLink