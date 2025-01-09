import { useState, useEffect, useContext } from "react";
import axios from "axios";
import TokenContext from "../TokenContext";
import UserContext from "../UserContext";
import TripsContext from "../TripsContext";
import TripDetail from "./TripDetail";
import MyTripsContext from "../MyTripsContext";

const MyTrip = ({ fetchMyTrips }) => {
    const [passengers, setPassengers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { trips, setTrips } = useContext(TripsContext)
    const { myTrips, setMyTrips } = useContext(MyTripsContext)
    const { token, setToken } = useContext(TokenContext)
    const { login, setLogin } = useContext(UserContext)


    async function deleteTrip(trip) {
        try {
            await axios.delete(`http://127.0.0.1:8000/${trip.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Trip deleted successfully");
            fetchMyTrips()
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    }

    async function getPassengers(trip) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/${trip.id}/passengers/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPassengers(response.data)
            setShowModal(true)
        } catch (error) {
            console.error("Error fetching passengers:", error);
            alert("Failed to fetch passengers. Please try again later.");
        }
    }

    async function toggleActiveStatus() {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/users/active/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(response.data.status);
        } catch (error) {
            console.error('Error toggling active status:', error);
        }
    }

    async function deleteTripPassenger(trip) {
        try {
            // Use the tripId variable in the URL
            await axios.delete(`http://127.0.0.1:8000/delete_trip/${trip.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Trip deleted successfully");
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    }

    useEffect(() => {
        fetchMyTrips();
    }, [trips]);

    return (
        <div className="mt-4">
            {myTrips.length > 0 ? (
                myTrips.map((trip, index) => (
                    <div key={index} className="card trip-item">
                        <TripDetail trip={trip} />
                        {login && login.user_type === "DR" ? (
                            <div>
                                <button className="btn-custom btn-warning">Edit Trip</button>
                                <button className="btn-custom btn-danger" onClick={() => deleteTrip(trip)}>Delete Trip</button>
                                <button className="btn-custom btn-info" onClick={() => getPassengers(trip)}>View Passengers</button>
                            </div>
                        ) : (
                            <div>
                                <button class="btn-custom btn-warning" onClick={toggleActiveStatus}>Toggle Active</button>
                                <button class="btn-custom btn-danger" onClick={() => deleteTripPassenger(trip)}>Delete Trip</button>
                            </div>
                        )}

                    </div>

                ))
            ) : (
                <p>No trips available.</p>
            )}

            {
                showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="passengersModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="passengersModalLabel">
                                        <i className="bi bi-people-fill me-2"></i> Passengers
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    {passengers.length > 0 ? (
                                        <div className="list-group">
                                            {passengers.map((passenger, idx) => (
                                                <div key={idx} className="list-group-item-pass">
                                                    <h6>
                                                        <i className="bi bi-person-fill me-2"></i> {passenger.username}
                                                    </h6>
                                                    <small>
                                                        <i className="bi bi-telephone-fill me-2"></i> {passenger.phone_number}
                                                    </small>
                                                    <small>
                                                        <i className="bi bi-telephone-fill me-2"></i> {passenger.email}
                                                    </small>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted">
                                            <i className="bi bi-info-circle-fill me-2"></i>No passengers found.
                                        </p>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



        </div >
    );
};

export default MyTrip;