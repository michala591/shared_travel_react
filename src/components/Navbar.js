import React from 'react'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <a className="navbar-brand" href="/#">Travel App</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="/#" id="homeLink">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#" id="registerLink">Register</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#" id="loginLink">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#" id="logoutLink">Logout</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#" id="myAccountLink">My Account</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar