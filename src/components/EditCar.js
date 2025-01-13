import React, { useContext, useState } from "react";
import axios from "axios";
import ShowToast from "./ShowToast";
import TokenContext from "../TokenContext";

const EditCar = ({ car, fetchMyCar, closeModal }) => {
    const { token, setToken } = useContext(TokenContext)
    const [licensePlate, setLicensePlate] = useState(car.license_plate);
    const [model, setModel] = useState(car.model);
    const [maxCapacity, setMaxCapacity] = useState(car.max_capacity);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");

    const handleEditCar = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `https://shared-travel-proj.onrender.com/cars/my_car/`,
                { license_plate: licensePlate, model, max_capacity: maxCapacity },
                { headers: { Authorization: `Bearer ${token}` }, });
            setError("");
            setShowToast(true);
            setToastType("success");
            setMessage("Car updated successfully");
            fetchMyCar(); // Refresh the car list
            closeModal(); // Close the modal
        } catch (error) {
            setError(error.response?.data?.error || "An unexpected error occurred.");
            setMessage("");
            setShowToast(true);
            setToastType("error");
        }
    };

    return (
        <>
            <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Car</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEditCar}>
                                <div className="mb-3">
                                    <label htmlFor="licensePlate" className="form-label">License Plate</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="licensePlate"
                                        value={licensePlate}
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label">Model</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="model"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="maxCapacity" className="form-label">Max Capacity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="maxCapacity"
                                        value={maxCapacity}
                                        onChange={(e) => setMaxCapacity(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ShowToast
                show={showToast}
                message={error || message}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};

export default EditCar;
