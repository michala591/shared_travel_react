import React from 'react';

const About = () => {
    return (
        <>
            <br />
            <br />
            <div className="container mt-5">
                <div className="card trip-item">
                    <div className="card-header">
                        <h1>About Shared Travel App</h1>
                    </div>
                    <div className="card-body">
                        <p className="lead">
                            The <strong>Shared Travel App</strong> is designed to simplify carpooling by connecting drivers and passengers.
                            It provides a user-friendly platform to manage trips, coordinate travel routes, and ensure dynamic seat allocation.
                        </p>
                        <h3>Features</h3>
                        <ul>
                            <li><strong>Driver Operations:</strong> Create and manage trips, view passengers, and handle cars.</li>
                            <li><strong>Passenger Operations:</strong> Search for trips, join or cancel reservations, and free up seats dynamically.</li>
                        </ul>
                        <h3>Technologies</h3>
                        <p>
                            This app is built using modern technologies such as:
                            <ul>
                                <li><strong>Frontend:</strong> React and Bootstrap for a clean and responsive UI.</li>
                                <li><strong>Backend:</strong> Django Rest Framework with JWT for secure authentication.</li>
                                <li><strong>Database:</strong> PostgreSQL for production deployment.</li>
                            </ul>
                        </p>
                        <h3>Future Plans</h3>
                        <p>
                            Upcoming features include email notifications for trip updates, favorite routes for passengers, and detailed trip statistics for drivers.
                        </p>
                        <p className="text-muted">We’re committed to making shared travel convenient and accessible for everyone.</p>
                    </div>
                    <div className="card-footer text-center">
                        <p>© 2025 Shared Travel App. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
