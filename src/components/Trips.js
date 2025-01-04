import React, { useContext } from 'react'
import TripsContext from '../TripsContext'

function Trips() {
    const { trips, setTrips } = useContext(TripsContext)

    return (
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
                        onClick={() => alert(`Joining trip: ${trip.origin_station.city} to ${trip.destination_station.city}`)}
                    >
                        Join the Ride
                    </button>
                </div>
            </div>
        ))}
    </div>
    )
}

export default Trips