import axios from 'axios';

const BASE_URL = 'https://shared-travel-proj.onrender.com'; // URL of your json-server

export const getAllTrips = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching trips:", error);
        return [];
    }
};

export const getLocations = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/locations/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
};


