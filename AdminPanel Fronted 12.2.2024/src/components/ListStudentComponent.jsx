import React,{useEffect, useState} from 'react'
import { deleteStudent, getStudent, listStudents } from '../services/StudentService'
import { useNavigate } from 'react-router-dom'

const ListStudentComponent = () => {
    const [students,setStudents]=useState([]) //Array to contain supplied data
    const [sid,setSid]=useState()
    const navigator = useNavigate();

    useEffect(()=>{
       if(!sid)
       {
       getAllStudent();
       }
    },[])

    function getAllStudent(){
        listStudents().then((response) =>{ //listStudent call the rest API get data
        setStudents(response.data);    //set data to the student variable
    }).catch(error =>{
        console.error(error);
    })
    } 
    function addNewStudent(){
        navigator('/add-student');
    }

    function updateStudent(anyId)
    {
        navigator(`/edit-student/${anyId}`)
    }

    function removeStudent(studentId)
    {
        deleteStudent(studentId).then((response) =>{
            getAllStudent()
        }).catch(error => {
            console.error(error);
        })
    }
    function getStudentById(sid) {
        console.log(sid);
        getStudent(sid)
          .then((response) => {
            setStudents([response.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Students</h2>
        <div className='button-container'>
        <button  className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
        <div className='input-group'>
        <input type='search' className='form-control rounded' 
        placeholder="Search with Student Id" aria-label="Search" aria-describedby="search-addon" 
        onChange={(e) => setSid(e.target.value)}/>
        <button type='button' className='btn btn-outline-primary' onClick={() =>getStudentById(sid)}>search</button>
        </div>
        </div>
        <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>NId</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Institution</th>
                    <th>Group</th>
                    <th>SSC Year</th>
                    <th>Preference</th>
                    <th>Curriculam</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { 
                    students.map(student =>
                        <tr key={student.nid}>
                            <td>{student.nid}</td>
                            <td>{student.studentId}</td>
                            <td>{student.studentName}</td>
                            <td>{student.studentGender}</td>
                            <td>{student.studentContactNumber}</td>
                            <td>{student.studentEmail}</td>
                            <td>{student.studentPassword}</td>
                            <td>{student.studentAddress}</td>
                            <td>{student.studentArea}</td>
                            <td>{student.studentInstitution}</td>
                            <td>{student.studentGroup}</td>
                            <td>{student.studentYear}</td>
                            <td>{student.studentPreferance}</td>
                            <td>{student.studentCariculam}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateStudent(student.studentId)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeStudent(student.studentId)}
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

export default ListStudentComponent