import React, { useState, useContext, useEffect } from "react";
import TripsContext from "../TripsContext";
import UserContext from "../UserContext";
import TokenContext from "../TokenContext";
import MyTrip from "./MyTrip";
import { useNavigate } from "react-router-dom";
import AddTrip from "./AddTrip";
import MyCar from "./MyCar";
import MyTripsContext from "../MyTripsContext";
import axios from "axios";
import SettingUser from "./SettingUser";

function MyAccountPage() {
  const { login, setLogin } = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const { MyTrips, setMyTrips } = useContext(MyTripsContext)
  const navigate = useNavigate()

  const fetchMyTrips = async () => {
    try {
      const response = await axios.get(`https://shared-travel-proj.onrender.com/my_trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      alert("Failed to fetch trips. Please try again later.");
    }
  };

  function logout() {
    setLogin(null)
    setToken(localStorage.removeItem("token"))
    setMyTrips("")
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

        {/* Main Content */}
        <div className="col-md-9">
          {/* My Car Section */}
          {login && login.user_type === "DR" && (
            <div id="my-car" className="card mb-4">
              <MyCar />
            </div>
          )}

          {/* My Trips Section */}
          <div id="my-trips" className="card">
            <div className="card-header">My Trips</div>
            <div className="card-body">
              {login && login.user_type === "DR" ? (<AddTrip fetchMyTrips={fetchMyTrips} />) : (null)}
              {/* Trips List */}
              <div className="mt-4">
                <MyTrip fetchMyTrips={fetchMyTrips} />
              </div>
            </div>
          </div>
          <div id="settings" className="card mt-4">
            <div className="card-header">Settings</div>
            <div className="card-body">
              <SettingUser />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyAccountPage;
