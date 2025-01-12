import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import TokenContext from "../TokenContext";
import TripsContext from "../TripsContext";

const AddTrip = ({ fetchMyTrips }) => {
    const { token, setToken } = useContext(TokenContext)
    const { trips, setTrips } = useContext(TripsContext)
    const [locations, setLocations] = useState([]);
    const [originStation, setOriginStation] = useState("");
    const [destinationStation, setDestinationStation] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newZone, setNewZone] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [days, setDays] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const addTripData = {
            origin_station: originStation,
            destination_station: destinationStation,
            days: days,
            departure_time: departureTime,
            return_time: returnTime,
        }
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/add_trips/", addTripData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                fetchMyTrips()
                setMessage("Success to add a trip");
                setError("")
                setOriginStation("")
                setDestinationStation("")
                setDepartureTime("")
                setReturnTime("")
                setDays("")
            })
            .catch((error) => {
                console.log(error)
                setError("Failed please try again")
                setMessage("")
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    }

    const handleAddNewLocation = () => {
        const addLocationsData = {
            city: newCity,
            zone: newZone,
        }
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/locations/", addLocationsData)
            .then((response) => {
                setMessage("Success to add a location");
                setError("")
            })
            .catch((error) => {
                console.log(error)
                setError("Register Failed please try again")
                setMessage("")
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };
    const getAllLocation = async () => {
        try {
            const response = await axios.get("https://shared-travel-proj.onrender.com/locations/");
            setLocations(response.data); // Store locations in state
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        getAllLocation();
    }, []);

    return (
        <>
            <button
                className="btn btn-success mb-3"
                data-bs-toggle="collapse"
                data-bs-target="#add-trip-form"
                aria-expanded="false"
                aria-controls="add-trip-form"
            > Add a Trip
            </button>
            <form id="add-trip-form" className="collapse" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="origin_station" className="form-label">Origin Station</label>
                    <div className="d-flex">
                        <select

                            className="form-select" id="origin_station" value={originStation}
                            onChange={(e) => setOriginStation(e.target.value)} required >
                            <option value="">Select Origin Station</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.city} - {location.zone}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="destination_station" className="form-label">Destination Station</label>
                    <div className="d-flex">
                        <select
                            className="form-select" id="destination_station" value={destinationStation}
                            onChange={(e) => setDestinationStation(e.target.value)} required >
                            <option value="">Select Destination Station</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.city} - {location.zone}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-2">
                    <button
                        className="btn btn-success mb-3"
                        data-bs-toggle="collapse"
                        data-bs-target="#add-destination-form"
                        aria-expanded="false"
                        aria-controls="add-destination-form"
                    > Add a New Destination
                    </button>
                    <form id="add-destination-form" className="collapse" onSubmit={handleSubmit}>
                        <label htmlFor="new_city" className="form-label">Add a New Destination City</label>
                        <input type="text" className="form-control" id="new_city" placeholder="City" value={newCity}
                            onChange={(e) => setNewCity(e.target.value)} />
                        <label htmlFor="new_zone" className="form-label mt-2">Zone</label>
                        <input type="text" className="form-control" id="new_zone" placeholder="Zone" value={newZone}
                            onChange={(e) => setNewZone(e.target.value)} />
                        <button type="button" className="btn btn-primary mt-2" onClick={handleAddNewLocation} >
                            Add Destination
                        </button>
                    </form>
                </div>
                <div className="mb-3">
                    <label htmlFor="departure_time" className="form-label">Departure Time</label>
                    <input type="time" className="form-control" id="departure_time" value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="return_time" className="form-label">Return Time</label>
                    <input type="time" className="form-control" id="return_time" value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="days" className="form-label">Days (e.g., Mon-Fri)</label>
                    <input type="text" className="form-control" id="days" value={days}
                        onChange={(e) => setDays(e.target.value)} required />
                </div>
                <button
                    type="submit"
                    className="btn-custom btn-warning"
                    data-bs-toggle="collapse"
                    data-bs-target="#add-trip-form"
                    aria-expanded="true"
                    aria-controls="add-trip-form"
                >
                    Add Trip
                </button>
            </form></>
    );
};
export default AddTrip;