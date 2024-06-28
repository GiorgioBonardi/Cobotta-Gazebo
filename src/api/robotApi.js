import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const startRobotController = () => {
    return axios.post(`${API_URL}/start-robot-controller`);
};

export const calibrateRobot = () => {
    return axios.post(`${API_URL}/calibrate`);
};

export const sendJointValues = async (jointValues) => {
    try {
        const response = await axios.post(`${API_URL}/move-joints`, jointValues);
        console.log('Joint values sent successfully:', response.data);
        return response.data; // Opzionale: ritorna i dati se necessario nel tuo frontend
    } catch (error) {
        console.error('Error sending joint values:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente frontend, se necessario
    }
};

export const sendMode = (selectedMode) => {
    return axios.post(`${API_URL}/mode`, { mode: selectedMode });
};