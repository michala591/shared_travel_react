import React, { useContext, useEffect, useState } from 'react'
import TokenContext from '../TokenContext';
import axios from 'axios';
import AddCar from './AddCar';
import { Link } from 'react-router-dom';
import ShowToast from './ShowToast';
import EditCar from './EditCar';

const MyCar = () => {
    const [cars, setCars] = useState([])
    const { token, setToken } = useContext(TokenContext)
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");

    const fetchMyCar = async () => {
        try {
            const response = await axios.get(`https://shared-travel-proj.onrender.com/cars/my_car/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCars(response.data);
        } catch (error) {
            setError("Failed to fetch cars. Please try again later.");
            setMessage("")
            setShowToast("true")
            setToastType("error")
        }
    };

    async function deleteCar() {
        try {
            await axios.delete(`https://shared-travel-proj.onrender.com/cars/my_car/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setError("")
            setShowToast("true")
            setToastType("success")
            setMessage("Car deleted successfully");
        } catch (error) {
            setError(error.response?.data?.error || "An unexpected error occurred.");
            setMessage("")
            setShowToast("true")
            setToastType("error")
        }
    }

    useEffect(() => {
        fetchMyCar()
    }, []);

    const openEditModal = (car) => {
        setSelectedCar(car);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setSelectedCar(null);
    };

    return (

        <>
            <div className="card-header">My Car</div>
            {cars.length > 0 ? (
                cars.map((car, index) => (
                    <div key={index} className="card-body">
                        <div>
                            <p><strong>Brand:</strong> {car.license_plate}</p>
                            <p><strong>Model:</strong> {car.model}</p>
                            <p><strong>Seats:</strong> {car.max_capacity}</p>
                        </div>
                        <div>
                            <button className="btn-custom btn-warning" onClick={() => openEditModal(car)}>Edit Car</button>
                            <button className="btn-custom btn-danger" onClick={deleteCar}>Delete Car</button>
                        </div>
                    </div>))
            ) : (
                <AddCar fetchMyCar={fetchMyCar} />
            )}

            {isEditing && selectedCar && (
                <EditCar
                    car={selectedCar}
                    fetchMyCar={fetchMyCar}
                    closeModal={closeEditModal}
                />
            )}

            <ShowToast
                show={showToast}
                message={error || message}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}

export default MyCar