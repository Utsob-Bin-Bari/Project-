import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080/api/tuitions';

export const listTuitions = () => axios.get(REST_API_BASE_URL); 

export const addTuition = (tuition) => axios.post(REST_API_BASE_URL, tuition); 

export const getTuition = (tuitionId) => axios.get(REST_API_BASE_URL + '/' +tuitionId);

export const updateTuition = (tuitionId, tuition) => axios.put(REST_API_BASE_URL+ '/' +tuitionId,tuition);

export const deleteTuition = (tuitionId) =>axios.delete(REST_API_BASE_URL+'/'+tuitionId);