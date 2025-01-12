import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import TokenContext from "../TokenContext";

const AddCar = () => {
    const { token, setToken } = useContext(TokenContext)
    const [carNumber, setCarNamber] = useState("");
    const [model, setModel] = useState("");
    const [seats, setSeats] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const addCarData = {
            license_plate: carNumber,
            model: model,
            max_capacity: seats
        }
        setLoading(true);
        axios
            .post("https://shared-travel-proj.onrender.com/cars/my_car/", addCarData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setMessage("Success to add a car");
                setError("")
                navigate("/account")
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

    return (
        <>
         <div className="card-body">
            <button
                className="btn btn-success mb-3"
                data-bs-toggle="collapse"
                data-bs-target="#add-car-form"
                aria-expanded="false"
                aria-controls="add-car-form"
            > Add a Car
            </button>
            <form id="add-car-form" className="collapse" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="license_plate" className="form-label">Car Number</label>
                    <input type="text" className="form-control" id="license_plate" value={carNumber}
                        onChange={(e) => setCarNamber(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input type="text" className="form-control" id="model" value={model}
                        onChange={(e) => setModel(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="seats" className="form-label">Seats</label>
                    <input type="number" className="form-control" id="seats" value={seats}
                        onChange={(e) => setSeats(e.target.value)} required />
                </div>
                <button type="submit" className="btn-custom btn-warning" >Add Car</button>
            </form>
            </div></>
    );
};
export default AddCar;
