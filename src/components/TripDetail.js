import React from "react";

const TripDetail = ({
    trip,
}) => (
    <>
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
        </div>
    </>
);

export default TripDetail;
