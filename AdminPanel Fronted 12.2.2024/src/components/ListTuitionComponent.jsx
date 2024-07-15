import React,{useEffect, useState} from 'react'
import { deleteTuition, getTuition, listTuitions } from '../services/TuitionService'
import { useNavigate } from 'react-router-dom'

const ListTuitionComponent = () => {
    const [tuitions,setTuitions]=useState([]) //Array to contain supplied data
    const [mid,setMid]=useState()
    const navigator = useNavigate();

    useEffect(()=>{
       if(!mid)
       {
       getAllTuition();
       }
    },[])

    function getAllTuition(){
        listTuitions().then((response) =>{ 
        setTuitions(response.data);    
    }).catch(error =>{
        console.error(error);
    })
    } 
    function addNewTuition(){
        navigator('/add-tuition');
    }

    function updateTuition(anyId)
    {
        navigator(`/edit-tuition/${anyId}`)
    }

    function removeTuition(tuitionId)
    {
        deleteTuition(tuitionId).then((response) =>{
            getAllTuition()
        }).catch(error => {
            console.error(error);
        })
    }
    function getTuitionById(mid) {
        console.log(mid);
        getTuition(mid)
          .then((response) => {
            setTuitions([response.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Tuitions</h2>
        <div className='button-container'>
        <button  className='btn btn-primary mb-2' onClick={addNewTuition}>Add Tuition</button>
        <div className='input-group'>
        <input type='search' className='form-control rounded' 
        placeholder="Search with Tuition Id" aria-label="Search" aria-describedby="search-addon" 
        onChange={(e) => setMid(e.target.value)}/>
        <button type='button' className='btn btn-outline-primary' onClick={() =>getTuitionById(mid)}>search</button>
        </div>
        </div>
        <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Tution No</th>
                    <th>Teacher Id</th>
                    <th>Student Id</th>
                    <th>Subject</th>
                    <th>Duration</th>
                    <th>Class Per Week</th>
                    <th>Payment</th>
                    <th>Number of Student</th>
                    <th>Description</th>
                    <th> Student Address</th>
                    <th>Student Area</th>
                    <th>Tution Starts</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { 
                    tuitions.map(tuition =>
                        <tr key={tuition.tuitionId}>
                            <td>{tuition.tuitionId}</td>
                            <td>{tuition.teacherId}</td>
                            <td>{tuition.studentId}</td>
                            <td>{tuition.subject}</td>
                            <td>{tuition.duration}</td>
                            <td>{tuition.daysPerWeek}</td>
                            <td>{tuition.payment}</td>
                            <td>{tuition.studentNumber}</td>
                            <td>{tuition.description}</td>
                            <td>{tuition.studentAddress}</td>
                            <td>{tuition.studentArea}</td>
                            <td>{tuition.tuitionStart}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateTuition(tuition.tuitionId)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeTuition(tuition.tuitionId)}
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

export default ListTuitionComponent