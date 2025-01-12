import React, { useContext, useEffect, useState } from 'react'
import TokenContext from '../TokenContext';
import axios from 'axios';
import AddCar from './AddCar';

const MyCar = () => {
    const [cars, setCars] = useState([])
    const { token, setToken } = useContext(TokenContext)

    const fetchMyCar = async () => {
        try {
            const response = await axios.get(`https://shared-travel-proj.onrender.com/cars/my_car/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("my car:", response.data)
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
            alert("Failed to fetch cars. Please try again later.");
        }
    };

    async function deleteCar() {
        try {
            await axios.delete(`https://shared-travel-proj.onrender.com/cars/my_car/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Car deleted successfully");
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    }

    useEffect(() => {
        fetchMyCar()
    }, []);

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
                            <button className="btn-custom btn-warning">Edit Car</button>
                            <button className="btn-custom btn-danger" onClick={deleteCar}>Delete Car</button>
                        </div>
                    </div>))
            ) : (
                <AddCar />
            )}

        </>
    )
}

export default MyCar