import axios from "axios";
let REST_API_BASE_URL = '';

if (Platform.OS === 'android') {
  REST_API_BASE_URL = 'http://10.0.2.2:8080/api/students'; // Android emulator
} else if (Platform.OS === 'ios') {
  REST_API_BASE_URL = 'http://localhost:8080/api/students'; // iOS simulator
}


export const getStudent=async(studentId) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/'+studentId,
    });
    return res;
}

export const getStudents=async() =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL,
    });
    return res;
}

export const addStudent=async(data) =>{
    const res= await axios({
        method:'post',
        url:REST_API_BASE_URL,
        data: data,
    });
    return res;
}

export const updateStudent=async(studentId,data) =>{
    const res= await axios({
        method:'put',
        url:REST_API_BASE_URL+'/'+studentId,
        data: data,
    });
    return res;
}

export const deleteStudent=async(studentId) =>{
    const res= await axios({
        method:'delete',
        url:REST_API_BASE_URL+'/'+studentId,
    });
    return res;
}


// const getAllStudentData = async ()=>{
//     await getStudents()
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };

// const addStudentData = async ()=>{
//     await addStudent(student)
//         .then(res => {
//           console.log(res.data);
//           console.log(res.status);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };

// const deleteStudentData = async ()=>{
//     await deleteTeacher(studentId)
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };




// const updateStudentData = async ()=>{
//     await updateTeacher(studentId,student)
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   };
