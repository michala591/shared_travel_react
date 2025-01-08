import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import UserContext from '../UserContext'


function Navbar() {
    const { login } = useContext(UserContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <a className="navbar-brand" href="/#">Travel App</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto me-3">
                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="nav-item"><a className="nav-link" href="/#" id="AboutLink">About</a></li>
                    <li className="nav-item"> {login && login.name ? (
                        <Link to="/account" className="nav-link">
                            Hello, {login.name}
                        </Link>
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar