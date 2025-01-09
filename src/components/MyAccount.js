import React, { useState, useContext, useEffect } from "react";
import TripsContext from "../TripsContext";
import UserContext from "../UserContext";
import TokenContext from "../TokenContext";
import MyTrip from "./MyTrip";
import { useNavigate } from "react-router-dom";
import AddTrip from "./AddTrip";
import MyCar from "./MyCar";
import MyTripsContext from "../MyTripsContext";


function MyAccountPage() {
  const { login, setLogin } = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const { MyTrips, setMyTrips } = useContext(MyTripsContext)

  const navigate = useNavigate()

  function logout() {
    setLogin(null)
    setToken(localStorage.removeItem("token"))
    navigate("/")
  }

  return (
    <div className="container mt-5">
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-header">My Account</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Overview</li>
                <li className="list-group-item">My Car</li>
                <li className="list-group-item">My Trips</li>
                <li className="list-group-item">Settings</li>
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

        {/* Main Content */}
        <div className="col-md-9">
          {/* My Car Section */}
          <div className="card mb-4">
            <MyCar />
          </div>

          {/* My Trips Section */}
          <div className="card">
            <div className="card-header">My Trips</div>
            <div className="card-body">
              {login && login.user_type === "DR" ? (<AddTrip />) : (null)}
              {/* Trips List */}
              <div className="mt-4">
                <MyTrip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
