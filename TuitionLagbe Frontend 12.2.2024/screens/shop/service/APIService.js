import axios from "axios";
let REST_API_BASE_URL = '';

if (Platform.OS === 'android') {
  REST_API_BASE_URL = 'http://10.0.2.2:8080/api/employees'; // Android emulator
} else if (Platform.OS === 'ios') {
  REST_API_BASE_URL = 'http://localhost:8080/api/employees'; // iOS simulator
}


export const getTeacher=async(id) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/'+id,
    });
    return res;
}

export const getTeachers=async() =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL,
    });
    return res;
}

export const addTeacher=async(data) =>{
    const res= await axios({
        method:'post',
        url:REST_API_BASE_URL,
        data: data,
    });
    return res;
}

export const updateTeacher=async(id,data) =>{
    const res= await axios({
        method:'put',
        url:REST_API_BASE_URL+'/'+id,
        data: data,
    });
    return res;
}

export const deleteTeacher=async(id) =>{
    const res= await axios({
        method:'delete',
        url:REST_API_BASE_URL+'/'+id,
    });
    return res;
}

export const matchedTeacher=async(institution, gender, cariculam) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/search',
        params:{
            institution: institution,
            gender: gender,
            cariculam: cariculam,
        }
    });
    return res;
}


// const getAllData = async ()=>{
//     await getTeachers()
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };

// const addData = async ()=>{
//     await addTeacher(teacher)
//         .then(res => {
//           console.log(res.data);
//           console.log(res.status);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };

// const deleteData = async ()=>{
//     await deleteTeacher(id)
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };




// const updateData = async ()=>{
//     await updateTeacher(id,teacher)
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };
