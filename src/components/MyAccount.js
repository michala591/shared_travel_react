import React, { useState, useContext } from "react";
import TripsContext from "../TripsContext";
import UserContext from "../UserContext";

function MyAccountPage() {
  const [car, setCar] = useState([])
  const { trips, setTrips } = useContext(TripsContext)
  const [newCar, setNewCar] = useState({ license_plate: "", model: "", max_capacity: "" });
  const [newTrip, setNewTrip] = useState({ origin: "", destination: "", departureTime: "", returnTime: "" });
  const { login, setLogin } = useContext(UserContext)

  const handleCarSubmit = (e) => {
    e.preventDefault();
    setCar(newCar);
    setNewCar({ license_plate: "", model: "", max_capacity: "" });
  };

  const handleTripSubmit = (e) => {
    e.preventDefault();
    setTrips([...trips, newTrip]);
    setNewTrip({ origin: "", destination: "", departureTime: "", returnTime: "" });
  };

  function logout() {
    setLogin(null)
    localStorage.removeItem("token")
  }

  return (
    <div className="container mt-5">
      <br></br>
      <br></br>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Account</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Overview</li>
                <li className="list-group-item">My Car</li>
                <li className="list-group-item">My Trips</li>
                <li className="list-group-item">Settings</li>
                <button id="logout-button" class="btn invite-btn" onClick={logout}>Logout</button>
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
              <button
                className="btn btn-success mb-3"
                data-bs-toggle="collapse"
                data-bs-target="#add-trip-form"
                aria-expanded="false"
                aria-controls="add-trip-form"
              >
                Add a Trip
              </button>
              <div className="collapse" id="add-trip-form">
                <form onSubmit={handleTripSubmit}>
                  <div className="form-group">
                    <label>Origin</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTrip.origin}
                      onChange={(e) => setNewTrip({ ...newTrip, origin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTrip.destination}
                      onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Departure Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={newTrip.departureTime}
                      onChange={(e) => setNewTrip({ ...newTrip, departureTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Return Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={newTrip.returnTime}
                      onChange={(e) => setNewTrip({ ...newTrip, returnTime: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Trip</button>
                </form>
              </div>

              {/* Trips List */}
              <div className="mt-4">
                {trips.length > 0 ? (
                  trips.map((trip, index) => (
                    <div key={index} className="card trip-item mb-3">
                      <div className="card-body">
                        <p><strong>Origin:</strong> {trip.origin}</p>
                        <p><strong>Destination:</strong> {trip.destination}</p>
                        <p><strong>Departure Time:</strong> {trip.departureTime}</p>
                        <p><strong>Return Time:</strong> {trip.returnTime}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No trips found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
