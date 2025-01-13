import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TokenContext from "../TokenContext";
import ShowToast from "./ShowToast";

const AddTrip = ({ fetchMyTrips }) => {
    const { token } = useContext(TokenContext);
    const [locations, setLocations] = useState([]);
    const [newCity, setNewCity] = useState("");
    const [newZone, setNewZone] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        originStation: "",
        destinationStation: "",
        departureTime: "",
        returnTime: "",
        days: "",
        goals: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false); // Modal for adding locations

    const handleSubmit = (e) => {
        e.preventDefault();
        const addTripData = {
            origin_station: formValues.originStation,
            destination_station: formValues.destinationStation,
            days: formValues.days,
            departure_time: formValues.departureTime,
            return_time: formValues.returnTime,
            goals: formValues.goals,
        };
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/add_trips/", addTripData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchMyTrips();
                setMessage("Trip added successfully!");
                setError("");
                setShowToast(true);
                setToastType("success");
                setFormValues({
                    originStation: "",
                    destinationStation: "",
                    departureTime: "",
                    returnTime: "",
                    days: "",
                    goals: "",
                });
                setShowModal(false); // Close the trip modal
            })
            .catch(() => {
                setError("Failed to add trip. Please try again.");
                setShowToast(true);
                setToastType("error");
                setMessage("");
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    const handleAddNewLocation = (e) => {
        e.preventDefault();
        const addLocationData = {
            city: newCity,
            zone: newZone,
        };
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/locations/", addLocationData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                setMessage("Location added successfully!");
                setError("");
                setShowToast(true);
                setToastType("success");
                setNewCity("");
                setNewZone("");
                setShowLocationModal(false); // Close the location modal
                getAllLocations();
            })
            .catch(() => {
                setError("Failed to add location. Please try again.");
                setShowToast(true);
                setToastType("error");
                setMessage("");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const getAllLocations = async () => {
        try {
            const response = await axios.get("https://shared-travel-proj.onrender.com/locations/");
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        getAllLocations();
    }, []);

    return (
        <>
            {/* Add Trip Button */}
            <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
                Add a Trip
            </button>

            {/* Modal for Add Trip */}
            {showModal && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Trip</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="origin_station" className="form-label">Origin Station</label>
                                        <select
                                            className="form-select"
                                            id="origin_station"
                                            name="originStation"
                                            value={formValues.originStation}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Origin Station</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.city} - {location.zone}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="destination_station" className="form-label">Destination Station</label>
                                        <select
                                            className="form-select"
                                            id="destination_station"
                                            name="destinationStation"
                                            value={formValues.destinationStation}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Destination Station</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.city} - {location.zone}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="departure_time" className="form-label">Departure Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="departure_time"
                                            name="departureTime"
                                            value={formValues.departureTime}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="return_time" className="form-label">Return Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="return_time"
                                            name="returnTime"
                                            value={formValues.returnTime}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="days" className="form-label">Days (e.g., Mon-Fri)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="days"
                                            name="days"
                                            value={formValues.days}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Adding..." : "Add Trip"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => setShowLocationModal(true)}
                                    >
                                        Add a New Destination
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Add Location */}
            {showLocationModal && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add a New Destination</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLocationModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddNewLocation}>
                                    <div className="mb-3">
                                        <label htmlFor="new_city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="new_city"
                                            placeholder="City"
                                            value={newCity}
                                            onChange={(e) => setNewCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new_zone" className="form-label">Zone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="new_zone"
                                            placeholder="Zone"
                                            value={newZone}
                                            onChange={(e) => setNewZone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Adding..." : "Add Location"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ShowToast
                show={showToast}
                message={error || message}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};

export default AddTrip;
