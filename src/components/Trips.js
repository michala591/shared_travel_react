import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import TripsContext from '../TripsContext'
import UserContext from '../UserContext';

function Trips() {
    const { trips, setTrips } = useContext(TripsContext)
    const { login, setLogin } = useContext(UserContext)
    const [error, setError] = useState('');
    const [letter, setLetter] = useState('');

    useEffect(() => {
        searchTrip()
    }, [letter])

    async function searchTrip() {
        try {
            let response;
            if (letter.trim() === '') {
                response = await axios.get(`http://127.0.0.1:8000/`);
            } else {
                response = await axios.get(`http://127.0.0.1:8000/search/`, {
                    params: { letter },
                });
            }
            setTrips(response.data);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError('An error occurred while fetching trips. Please try again.');
        }
    }

    const joinTrip = async (index) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/${trips[index].id}/invite/`);
            console.log("Successfully joined the trip:", response.data);
        } catch (error) {
            console.error("Error joining the trip:", error);
        }
    };
    return (
        <>

            <div class="container mt-5 pt-5">
                <div class="search-section">
                    <div class="col-md-8">
                        <input value={letter} onChange={(e) => setLetter(e.target.value)} class="form-control search-input"
                            placeholder="Search trips by city or zone" />
                    </div>
                    <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                </div>
            </div>
            <div className="trips-list">
                {trips.map((trip, index) => (
                    <div key={index} className="card trip-item">
                        <div className="card-header">
                            {trip.origin_station.city} to {trip.destination_station.city}
                        </div>
                        <div className="card-body">
                            <div className="trip-details">
                                <strong>Origin:</strong> {trip.origin_station.city}, {trip.origin_station.zone}
                            </div>
                            <div className="trip-details">
                                <strong>Destination:</strong> {trip.destination_station.city}, {trip.destination_station.zone}
                            </div>
                            <div className="trip-details">
                                <strong>Departure Time:</strong> {trip.departure_time}
                            </div>
                            <div className="trip-details">
                                <strong>Return Time:</strong> {trip.return_time}
                            </div>
                            <div className="trip-details">
                                <strong>Seats Available:</strong> {trip.available_seats}
                            </div>
                            <button
                                className="btn invite-btn"
                                onClick={login ? (() => joinTrip(index)) : (alert("please log in"))}
                            >
                                Join the Ride
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Trips