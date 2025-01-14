import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import TripsContext from '../TripsContext'
import UserContext from '../UserContext';
import TokenContext from '../TokenContext';
import TripDetail from './TripDetail';
import ShowToast from './ShowToast';
import { getLocations } from '../api';

function Trips() {
    const { trips, setTrips } = useContext(TripsContext)
    const { login, setLogin } = useContext(UserContext)
    const { token, setToken } = useContext(TokenContext)
    const [error, setError] = useState('');
    const [letter, setLetter] = useState('');
    const [originList, setOriginList] = useState([]);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");

    useEffect(() => {
        getLocations()
        searchTrip()
    }, [letter])

    async function searchTrip() {
        try {
            let response;
            if (letter.trim() === '') {
                response = await axios.get(`https://shared-travel-proj.onrender.com/`);
            } else {
                response = await axios.get(`https://shared-travel-proj.onrender.com/search/`, {
                    params: { letter },
                });
            }
            if (Array.isArray(response.data)) {
                const tripsFound = response.data
                setTrips(tripsFound);
                const origins = tripsFound.map(trip => trip.origin_station);
                setOriginList(origins);
            } else {
                console.error("Expected an array, got:", response.data);
                setTrips([]); // Prevent .map() error
            }
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError('An error occurred while fetching trips. Please try again.');
            setShowToast("true")
            setToastType("error")
            setTrips([]); // Set to empty array on error
        }
    }

    const joinTrip = async (index) => {
        if (login && login.name) {
            try {
                const response = await axios.post(`https://shared-travel-proj.onrender.com/${trips[index].id}/invite/`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage(response.data.status);
                setShowToast("true")
                setToastType("success")

            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                    setShowToast("true")
                    setToastType("error")
                } else {
                    console.error("Error joining the trip:", error);
                    setError("An error occurred while trying to join the trip.");
                    setShowToast("true")
                    setToastType("error")
                }
            }
        }
        else { alert("Please log in.") }
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
                {trips.length > 0 ? (
                    trips.map((trip, index) => (
                        <div key={index} className="card trip-item">
                            <TripDetail trip={trip} />
                            <button
                                className="btn invite-btn"
                                onClick={() => joinTrip(index)}
                            >
                                Join the Ride
                            </button>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
            <ShowToast
                show={showToast}
                message={error || message}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}

export default Trips