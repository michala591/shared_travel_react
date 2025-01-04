import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // URL of your json-server

export const getAllTrips = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching trips:", error);
        return [];
    }
};



