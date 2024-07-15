import React, { useEffect, useState } from 'react' 
import { addTuition, getTuition, updateTuition } from '../services/TuitionService' 
import { useNavigate, useParams } from 'react-router-dom'

const TuitionComponent = () => {
    const[tuitionId,setTuitionId] = useState()
    const[teacherId,setTeacherId] = useState()
    const[studentId,setStudentId] = useState()
    const [subject , setSubject] = useState()
    const [duration, setDuration]=useState()
    const [daysPerWeek, setDaysPerWeek] = useState()
    const [payment,setPayment] = useState()
    const [studentNumber,setStudentNumber]=useState()
    const [description, setDescription]=useState()
    const [studentArea,setStudentArea]=useState()
    const [studentAddress,setStudentAddress]=useState()
    const [tuitionStart,setTuitionStart]=useState()
  
    const {pathId} =useParams();
    const[errors, setErrors] = useState(
        {tuitionId:'',teacherId: '' ,studentId : '' ,subject : '' ,duration : '',daysPerWeek : '',     
        payment : '', studentNumber : '', description:'',studentArea:'',studentAddress:'',
        tuitionStart:''})

    const navigator = useNavigate();

    useEffect(() =>{
        if(pathId)
        {
            getTuition(pathId).then((response) =>{
                setTuitionId(response.data.tuitionId);
                setTeacherId(response.data.teacherId);
                setStudentId(response.data.studentId);
                setSubject(response.data.subject);
                setDuration(response.data.duration);
                setDaysPerWeek(response.data.daysPerWeek);
                setPayment(response.data.payment);
                setStudentNumber(response.data.studentNumber);
                setDescription(response.data.description);
                setStudentArea(response.data.studentArea);
                setStudentAddress(response.data.studentAddress);
                setTuitionStart(response.data.tuitionStart);
                
            }).catch(error =>{
                console.error(error);
            })
        }
    }, [pathId])

    function saveOrUpdateTuition(e)
    {
        e.preventDefault();
        if(validateForm())
        {
            const tuition = {tuitionId,teacherId,studentId ,subject ,duration,daysPerWeek,payment,
            studentNumber,description,studentArea,studentAddress,tuitionStart}
            console.log(tuition)

            if(pathId){
                updateTuition(pathId,tuition).then((response)=>{
                    console.log(response.data);
                    navigator('/tuitions');
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                addTuition(tuition).then((response) => {    //calling post api
                    console.log(response.data);
                    navigator('/tuitions');    //returning to the list teacher page
                }).catch(error =>{
                    console.error(error);
                })
            }
        }
            
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}
        if(tuitionId!==0){
            errorsCopy.tuitionId='';
        }else{
            errorsCopy.tuitionId = 'Tuition No is required!';
            valid = false;
        }

        if(teacherId!==0){
            errorsCopy.teacherId='';
        }else{
            errorsCopy.teacherId = 'Teacher Id is required!';
            valid = false;
        }

        if(studentId!==0){
            errorsCopy.studentId='';
        }else{
            errorsCopy.studentId = 'Student Id is required!';
            valid = false;
        }

        if(subject.trim()){
            errorsCopy.subject='';
        }else{
            errorsCopy.subject = 'Subject is required!';
            valid = false;
        }

        if(duration.trim()){
            errorsCopy.duration='';
        }else{
            errorsCopy.duration = 'Duration is required!';
            valid = false;
        }

        if(daysPerWeek.trim()){
            errorsCopy.daysPerWeek='';
        }else{
            errorsCopy.daysPerWeek = 'Class Per Week is required!';
            valid = false;
        }

        if(payment.trim()){
            errorsCopy.payment='';
        }else{
            errorsCopy.payment = 'Payment amount is required!';
            valid = false;
        }

        if(studentNumber.trim()){
            errorsCopy.studentNumber='';
        }else{
            errorsCopy.studentNumber = 'Number of Students is required!';
            valid = false;
        }

        if(description.trim()){
            errorsCopy.description='';
        }else{
            errorsCopy.description = 'Description is required!';
            valid = false;
        }

        if(studentArea.trim()){
            errorsCopy.studentArea='';
        }else{
            errorsCopy.studentArea = 'Student Area is required!';
            valid = false;
        }

        if(studentAddress.trim()){
            errorsCopy.studentAddress='';
        }else{
            errorsCopy.studentAddress = 'Student Address is required!';
            valid = false;
        }

        if(tuitionStart.trim()){
            errorsCopy.tuitionStart='';
        }else{
            errorsCopy.tuitionStart = 'Start Date is required!';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(pathId){
            return <h2 className='text-center'>Update Tuition</h2>
        }
        else{
            return <h2 className='text-center'>Add Tuition</h2>
        }
    }



  return (
    <div className='container'>
        <br /> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                    <div className='form-group mb-2'>
                            <label className='form-label'>Tuition No:</label>
                            <input type='number' placeholder='Your Tuition Id'
                                   name='tuitionId' value={tuitionId}
                                   disabled={pathId !== undefined}
                                   className={`form-control ${errors.tuitionId ? 'is-invalid' : ''}`}
                                   onChange={(e) => setTuitionId(e.target.value)}>
                            </input> 
                            { errors.tuitionId && <div className='invalid-feedback'> {errors.tuitionId}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Teacher Id:</label>
                            <input type='number' placeholder='Enter Teacher Id'
                                   name='teacherId' value={teacherId}
                                   className={`form-control ${errors.teacherId ? 'is-invalid' : ''}`}
                                   onChange={(e) => setTeacherId(e.target.value)}>
                            </input> 
                            { errors.teacherId && <div className='invalid-feedback'> {errors.teacherId}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Id:</label>
                            <input type='number' placeholder='Enter Student Id'
                                   name='studetnId' value={studentId}
                                   className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                                   onChange={(e) => setStudentId(e.target.value)}>
                            </input> 
                            { errors.studentId && <div className='invalid-feedback'> {errors.studentId}</div>}       
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Subject:</label>
                            <input type='text' placeholder='Enter all Subject'
                                   name='subject' value={subject}
                                   className={`form-control ${errors.subject ? 'is-invalid' : ''}`} 
                                   onChange={(e) => setSubject(e.target.value)}>
                            </input>
                            { errors.subject && <div className='invalid-feedback'>{errors.subject}</div>}        
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Duration:</label>
                            <input type='text' placeholder='Enter Class Duration'
                                   name='duration' value={duration}
                                   className={`form-control ${errors.duration ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setDuration(e.target.value)}>
                            </input>
                            { errors.duration && <div className='invalid-feedback'> {errors.duration}</div>}        
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>Class Per week:</label>
                            <input type='text' placeholder='Enter Class Per Week'
                                   name='daysPerWeek' value={daysPerWeek}
                                   className={`form-control ${errors.daysPerWeek ? 'is-invalid' : ''}`}
                                   onChange={(e) => setDaysPerWeek(e.target.value)}>
                            </input> 
                            { errors.daysPerWeek && <div className='invalid-feedback'> {errors.daysPerWeek}</div>}       
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Payment:</label>
                            <input type='text' placeholder='Enter Payment Per 12 Days'
                                   name='payment' value={payment}
                                   className={`form-control ${errors.payment ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setPayment(e.target.value)}>
                            </input>
                            { errors.payment && <div className='invalid-feedback'> {errors.payment}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Number of Student:</label>
                            <input type='text' placeholder='Enter Number Of Student'
                                   name='studentNumber' value={studentNumber}
                                   className={`form-control ${errors.studentNumber ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentNumber(e.target.value)}>
                            </input>
                            { errors.studentNumber && <div className='invalid-feedback'> {errors.studentNumber}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Description:</label>
                            <input type='text' placeholder='Enter Any Info or Special Request'
                                   name='description' value={description}
                                   className={`form-control ${errors.description ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setDescription(e.target.value)}>
                            </input>
                            { errors.description && <div className='invalid-feedback'> {errors.description}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Address:</label>
                            <input type='text' placeholder='Enter Address of Student'
                                   name='studentAddress' value={studentAddress}
                                   className={`form-control ${errors.studentAddress ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentAddress(e.target.value)}>
                            </input>
                            { errors.studentAddress && <div className='invalid-feedback'> {errors.studentAddress}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Student Area:</label>
                            <input type='text' placeholder='Enter Area of Student'
                                   name='studentArea' value={studentArea}
                                   className={`form-control ${errors.studentArea ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setStudentArea(e.target.value)}>
                            </input>
                            { errors.studentArea && <div className='invalid-feedback'> {errors.studentArea}</div>}        
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Start date:</label>
                            <input type='text' placeholder='Enter Tution Start Date'
                                   name='tuitionStart' value={tuitionStart}
                                   className={`form-control ${errors.tuitionStart ? 'is-invalid' : ''}`}  
                                   onChange={(e) => setTuitionStart(e.target.value)}>
                            </input>
                            { errors.tuitionStart && <div className='invalid-feedback'> {errors.tuitionStart}</div>}        
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateTuition}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TuitionComponent