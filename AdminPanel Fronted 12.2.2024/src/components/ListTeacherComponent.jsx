import React,{useEffect, useState} from 'react'
import { deleteTeacher, getTeacher, listTeachers } from '../services/TeacherService'
import { useNavigate } from 'react-router-dom'

const ListTeacherComponent = () => {
    const [teachers,setTeachers]=useState([]) //Array to contain supplied data
    const[tid,setTid]=useState()
    const navigator = useNavigate();

    useEffect(()=>{
       if(!tid){
       getAllTeacher();
       }
    },[])

    function getAllTeacher(){
        listTeachers().then((response) =>{ //listTeacher call the rest API get data
        setTeachers(response.data);    //set data to the Teacher variable
    }).catch(error =>{
        console.error(error);
    })
    } 
    function addNewTeacher(){
        navigator('/add-teacher');
    }

    function updateTeacher(anyId)
    {
        navigator(`/edit-Teacher/${anyId}`)
    }

    function removeTeacher(id)
    {
        deleteTeacher(id).then((response) =>{
            getAllTeacher()
        }).catch(error => {
            console.error(error);
        })
    }
    function getTeacherById(tid) {
        console.log(tid);
        getTeacher(tid)
          .then((response) => {
            setTeachers([response.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      

  return (
    <div className='container'>
        <h2 className='text-center'>List of Teachers</h2>

        
        <div className='button-container'>
        <button  className='btn btn-primary mb-2' onClick={addNewTeacher}>Add Teacher</button>
        <div className='input-group'>
        <input type='search' className='form-control rounded' 
        placeholder="Search with student Id" aria-label="Search" aria-describedby="search-addon" 
        onChange={(e) => setTid(e.target.value)}/>
        <button type='button' className='btn btn-outline-primary' onClick={() =>getTeacherById(tid)}>search</button>
        </div>
        </div>

        <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Institution</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Preference</th>
                    <th>Curriculam</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { 
                    teachers.map(teacher =>
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.gender}</td>
                            <td>{teacher.contactNumber}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.password}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.area}</td>
                            <td>{teacher.institution}</td>
                            <td>{teacher.department}</td>
                            <td>{teacher.year}</td>
                            <td>{teacher.preferance}</td>
                            <td>{teacher.cariculam}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateTeacher(teacher.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeTeacher(teacher.id)}
                                    style={{marginLeft: '3px',marginTop:'3px'}} >Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListTeacherComponent