import axios from "axios";
let REST_API_BASE_URL = "https://dummy.restapiexample.com/api/v1/";

//Return all employee data
export const getAllEmployee =async ()=>{
    try {
    const response = await axios.get(`${REST_API_BASE_URL}employees`);
    return response.data.data;
  } catch (error) {
    // console.log(error+" Get");
    return [];
  }
}

//Create New Employee
export const addEmployee = async(employeeData)=>{
    try{
      const response = await axios.post(`${REST_API_BASE_URL}create`,employeeData);
      return response.data.data.id;
    } catch (error){
      // console.log(error+" Add")
      return null;
    }
    
};

//Update a employee data
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${REST_API_BASE_URL}update/${id}`, employeeData);
    return response.data.response;
  } catch (error) {
    // console.log(error+" Update")
    return null;
  }
};