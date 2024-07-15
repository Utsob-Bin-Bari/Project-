import axios from "axios";
let REST_API_BASE_URL = '';

if (Platform.OS === 'android') {
  REST_API_BASE_URL = 'http://10.0.2.2:8080/api/tuitions'; // Android emulator
} else if (Platform.OS === 'ios') {
  REST_API_BASE_URL = 'http://localhost:8080/api/tuitions'; // iOS simulator
}


export const getTuition=async(tuitionId) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/'+tuitionId,
    });
    return res;
}

export const getTuitions=async() =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL,
    });
    return res;
}

export const addTuition=async(data) =>{
    const res= await axios({
        method:'post',
        url:REST_API_BASE_URL,
        data: data,
    });
    return res;
}

export const updateTuition=async(tuitionId,data) =>{
    const res= await axios({
        method:'put',
        url:REST_API_BASE_URL+'/'+tuitionId,
        data: data,
    });
    return res;
}

export const deleteTuition=async(tuitionId) =>{
    const res= await axios({
        method:'delete',
        url:REST_API_BASE_URL+'/'+tuitionId,
    });
    return res;
}

export const getTuitionByTeacherId=async(teacherId) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/teacherId/'+teacherId,
    });
    return res;
}

export const getTuitionByStudentId=async(studentId) =>{
    const res= await axios({
        method:'get',
        url:REST_API_BASE_URL+'/studentId/'+studentId,
    });
    return res;
}

 