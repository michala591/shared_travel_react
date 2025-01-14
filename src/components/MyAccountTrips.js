import React, { useContext } from 'react'
import axios from 'axios'
import UserContext from '../UserContext'
import AddTrip from './AddTrip'
import MyTrip from './MyTrip'
import TokenContext from '../TokenContext'
import MyTripsContext from '../MyTripsContext'

function MyAccountTrips() {
    const { login, setLogin } = useContext(UserContext)
    const { token, setToken } = useContext(TokenContext)
    const { MyTrips, setMyTrips } = useContext(MyTripsContext)

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

    return (
        <div>
            <div id="my-trips" className="card">
                <div className="card-header">My Trips</div>
                <div className="card-body">
                    {login && login.user_type === "DR" ? (<AddTrip fetchMyTrips={fetchMyTrips} />) : (null)}
                    {/* Trips List */}
                    <div className="mt-4">
                        <MyTrip fetchMyTrips={fetchMyTrips} />
                    </div>
                </div>
            </div></div>
    )
}

export default MyAccountTrips