import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import TripsContext from '../TripsContext'
import UserContext from '../UserContext';
import TokenContext from '../TokenContext';
import TripDetail from './TripDetail';

function Trips() {
    const { trips, setTrips } = useContext(TripsContext)
    const { login } = useContext(UserContext)
    const { token, setToken } = useContext(TokenContext)
    const [error, setError] = useState('');
    const [letter, setLetter] = useState('');
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        searchTrip()
    }, [letter])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

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
        if (login && login.name) {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/${trips[index].id}/invite/`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Successfully joined the trip:", response.data);
                alert(response.data.status);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error); // Show server error message
                } else {
                    console.error("Error joining the trip:", error);
                    alert("An error occurred while trying to join the trip.");
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
                {trips.map((trip, index) => (
                    <div key={index} className="card trip-item">
                        <TripDetail trip={trip} />
                        <button
                            className="btn invite-btn"
                            onClick={() => joinTrip(index)}
                        >
                            Join the Ride
                        </button>
                    </div>
                ))}
            </div>
            {showScrollButton && (
                <button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                >
                    ↑
                </button>
            )}
        </>
    )
}

export default Trips