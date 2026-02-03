import axios from "axios";

const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return "http://localhost:8080";
    }
    return "https://robot-store-backend.onrender.com";
};

const url = getBaseUrl();

export const getAll = async () => {
    try {
        // שינוי כאן: פנייה ישירה ל-getAllRobots
        const { data } = await axios.get(`${url}/getAllRobots`); 
        return data;
    } catch (e) {
        console.error("Error fetching all robots:", e);
        throw e;
    }
}

export const getById = async (id) => {
    try {
        const { data } = await axios.get(`${url}/getRobotById/${id}`);
        return data;
    } catch (e) {
        console.error("Error fetching robot by ID:", e);
        throw e;
    }
}