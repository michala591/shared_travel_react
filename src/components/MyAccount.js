import React, { useState, useContext } from "react";
import TripsContext from "../TripsContext";
import UserContext from "../UserContext";
import TokenContext from "../TokenContext";
import MyTrip from "./MyTrip";
import { useNavigate } from "react-router-dom";
import AddTrip from "./AddTrip";


function MyAccountPage() {
  const [car, setCar] = useState([])
  const { trips, setTrips } = useContext(TripsContext)
  const [newCar, setNewCar] = useState({ license_plate: "", model: "", max_capacity: "" });
  const [newTrip, setNewTrip] = useState({ origin: "", destination: "", departureTime: "", returnTime: "" });
  const { login, setLogin } = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const navigate = useNavigate()



  const handleCarSubmit = (e) => {
    e.preventDefault();
    setCar(newCar);
    setNewCar({ license_plate: "", model: "", max_capacity: "" });
  };

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
            <div className="card-header">My Car</div>
            <div className="card-body">
              {car ? (
                <div>
                  <p><strong>Brand:</strong> {car.license_plate}</p>
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Seats:</strong> {car.max_capacity}</p>
                </div>
              ) : (
                <form onSubmit={handleCarSubmit}>
                  <div className="form-group">
                    <label>Brand</label>
                    <input type="text" className="form-control" value={newCar.brand}
                      onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Model</label>
                    <input type="text" className="form-control" value={newCar.model}
                      onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input type="number" className="form-control" value={newCar.year}
                      onChange={(e) => setNewCar({ ...newCar, year: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Seats</label>
                    <input type="number" className="form-control" value={newCar.seats}
                      onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Car</button>
                </form>
              )}
            </div>
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
