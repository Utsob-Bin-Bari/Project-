import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listTeachers = () => axios.get(REST_API_BASE_URL); 
//getting all teacher
export const addTeacher = (teacher) => axios.post(REST_API_BASE_URL, teacher); 
//posting a new teacher
export const getTeacher = (teacherId) => axios.get(REST_API_BASE_URL + '/' +teacherId); 
//get teacher by Id
export const updateTeacher = (teacherId, teacher) => axios.put(REST_API_BASE_URL+ '/' +teacherId,teacher); 
//update teacher by Id
export const deleteTeacher = (teacherId) =>axios.delete(REST_API_BASE_URL+'/'+teacherId);
//delete teacher by Id