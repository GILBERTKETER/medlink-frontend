import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/patients', // Django backend URL
});

export const registerPatient = async (patientData) => {
  try {
    const response = await api.post('/patients', patientData);
    return response.data;
  } catch (error) {
    console.error('Error registering patient:', error);
    throw error;
  }
};
