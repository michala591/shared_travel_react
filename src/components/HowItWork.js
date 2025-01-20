import React from 'react';

function HowItWork() {
    return (
        <>
            <br />
            <br />
            <div className="container mt-5">
                <div className="card shadow-lg">
                    <div className="card-header">
                        <h1 className="display-4">How It Works</h1>
                    </div>
                    <div className="card-body">
                        <section className="mb-5">
                            <h2 className="text-secondary">For Drivers</h2>
                            <ol className="list-group list-group-numbered">
                                <li className="list-group-item">Register/Login to your account.</li>
                                <li className="list-group-item">Add your car details.</li>
                                <li className="list-group-item">
                                    Create a trip.
                                    <span className="text-muted"> (Add a new location if needed.)</span>
                                </li>
                            </ol>
                            <p className="mt-3">
                                <strong>Once logged in, you can:</strong>
                            </p>
                            <ul className="list-group">
                                <li className="list-group-item">Update your car details.</li>
                                <li className="list-group-item">
                                    Delete your car
                                    <span className="text-muted"> (only if no trips are assigned).</span>
                                </li>
                                <li className="list-group-item">Add new trips.</li>
                                <li className="list-group-item">Update existing trips.</li>
                                <li className="list-group-item">Delete trips.</li>
                                <li className="list-group-item">View passengers assigned to your trips.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-secondary">For Passengers</h2>
                            <ol className="list-group list-group-numbered">
                                <li className="list-group-item">Register/Login to your account.</li>
                                <li className="list-group-item">Join your favorite trips.</li>
                            </ol>
                            <p className="mt-3">
                                <strong>Once logged in, you can:</strong>
                            </p>
                            <ul className="list-group">
                                <li className="list-group-item">Cancel your trip reservations.</li>
                                <li className="list-group-item">
                                    Mark yourself as inactive to free up your spot on a trip.
                                </li>
                            </ul>
                        </section>

                        <div className="mt-5 text-muted text-center">
                            <p>We’re committed to making shared travel convenient and accessible for everyone.</p>
                        </div>
                    </div>
                    <div className="card-footer text-center bg-light">
                        <p>© 2025 Shared Travel App. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HowItWork;
